import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Database } from '@/integrations/supabase/types';

type Member = Database['public']['Tables']['members']['Row'];

export const generateMembersPDF = (members: Member[], title: string = 'Members Report') => {
  const doc = new jsPDF('landscape'); // Switch to landscape for more space
  console.log('Generating PDF for', members.length, 'members');
  
  // Add title and date
  doc.setFontSize(18);
  doc.text(title, 14, 15);
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);
  doc.text(`Total Members: ${members.length}`, 14, 32);

  // Group members by collector
  const membersByCollector = members.reduce((acc, member) => {
    const collector = member.collector || 'Unassigned';
    if (!acc[collector]) {
      acc[collector] = [];
    }
    acc[collector].push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  console.log('Grouped members by collector:', Object.keys(membersByCollector).length, 'collectors');

  let startY = 40;
  let currentPage = 1;

  // Define table columns with optimized widths for landscape mode
  const columns = [
    { header: '#', dataKey: 'member_number', width: 15 },
    { header: 'Name', dataKey: 'full_name', width: 40 },
    { header: 'Contact', dataKey: 'contact', width: 40 },
    { header: 'Address', dataKey: 'address', width: 60 },
    { header: 'Status', dataKey: 'status', width: 20 },
    { header: 'Type', dataKey: 'type', width: 25 }
  ];

  // Generate tables for each collector group
  Object.entries(membersByCollector).forEach(([collector, collectorMembers], index) => {
    console.log(`Processing collector ${collector} with ${collectorMembers.length} members`);

    // Always start a new page for each collector except the first one
    if (index > 0) {
      doc.addPage();
      startY = 20;
    }

    // Add collector section header
    doc.setFontSize(14);
    doc.text(`Collector: ${collector}`, 14, startY);
    doc.setFontSize(11);
    doc.text(`Members: ${collectorMembers.length}`, 14, startY + 7);
    
    // Prepare data rows with optimized data formatting
    const rows = collectorMembers.map(member => ({
      member_number: member.member_number || 'N/A',
      full_name: member.full_name || 'N/A',
      contact: [
        member.email,
        member.phone
      ].filter(Boolean).join('\n') || 'N/A',
      address: [
        member.address,
        member.town,
        member.postcode
      ].filter(Boolean).join(', ') || 'N/A',
      status: member.status || 'N/A',
      type: member.membership_type || 'Standard'
    }));

    // Generate table with automatic page breaks and optimized settings
    autoTable(doc, {
      startY: startY + 15,
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
      didDrawPage: (data) => {
        // Add page number to each page
        doc.setFontSize(10);
        const pageNumber = (doc as any).internal.getNumberOfPages();
        doc.text(
          `Page ${pageNumber}`,
          doc.internal.pageSize.width - 30,
          doc.internal.pageSize.height - 10
        );
      },
      styles: { 
        fontSize: 8,
        cellPadding: 1.5,
        overflow: 'linebreak',
        halign: 'left'
      },
      columnStyles: {
        member_number: { cellWidth: columns[0].width },
        full_name: { cellWidth: columns[1].width },
        contact: { cellWidth: columns[2].width },
        address: { cellWidth: columns[3].width },
        status: { cellWidth: columns[4].width },
        type: { cellWidth: columns[5].width }
      },
      headStyles: { 
        fillColor: [137, 137, 222],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'left'
      },
      alternateRowStyles: { 
        fillColor: [245, 245, 245] 
      },
      margin: { 
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
      },
      tableWidth: 'auto',
      showHead: 'everyPage',
      pageBreak: 'auto',
      rowPageBreak: 'auto'
    });

    // Update startY for next section
    const finalY = (doc as any).lastAutoTable.finalY;
    startY = finalY + 15;
  });

  // Save the PDF with a formatted date in the filename
  const date = new Date().toISOString().split('T')[0];
  const filename = `members-report-${date}.pdf`;
  console.log('Saving PDF as:', filename);
  doc.save(filename);
};