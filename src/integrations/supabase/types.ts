export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      backup_history: {
        Row: {
          backup_file_name: string | null
          collectors_count: number | null
          error_message: string | null
          id: string
          members_count: number | null
          operation_type: Database["public"]["Enums"]["backup_operation_type"]
          performed_at: string | null
          performed_by: string | null
          policies_count: number | null
          roles_count: number | null
          status: string | null
        }
        Insert: {
          backup_file_name?: string | null
          collectors_count?: number | null
          error_message?: string | null
          id?: string
          members_count?: number | null
          operation_type: Database["public"]["Enums"]["backup_operation_type"]
          performed_at?: string | null
          performed_by?: string | null
          policies_count?: number | null
          roles_count?: number | null
          status?: string | null
        }
        Update: {
          backup_file_name?: string | null
          collectors_count?: number | null
          error_message?: string | null
          id?: string
          members_count?: number | null
          operation_type?: Database["public"]["Enums"]["backup_operation_type"]
          performed_at?: string | null
          performed_by?: string | null
          policies_count?: number | null
          roles_count?: number | null
          status?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          address: string | null
          admin_note: string | null
          auth_user_id: string | null
          collector: string | null
          collector_id: string | null
          cors_enabled: boolean | null
          created_at: string
          created_by: string | null
          date_of_birth: string | null
          email: string | null
          emergency_collection_amount: number | null
          emergency_collection_created_at: string | null
          emergency_collection_due_date: string | null
          emergency_collection_status: string | null
          family_member_dob: string | null
          family_member_gender: string | null
          family_member_name: string | null
          family_member_relationship: string | null
          full_name: string
          gender: string | null
          id: string
          marital_status: string | null
          member_number: string
          membership_type: string | null
          payment_amount: number | null
          payment_date: string | null
          payment_notes: string | null
          payment_type: string | null
          phone: string | null
          postcode: string | null
          status: string | null
          ticket_description: string | null
          ticket_priority: string | null
          ticket_status: string | null
          ticket_subject: string | null
          town: string | null
          updated_at: string
          verified: boolean | null
          yearly_payment_amount: number | null
          yearly_payment_due_date: string | null
          yearly_payment_status: string | null
        }
        Insert: {
          address?: string | null
          admin_note?: string | null
          auth_user_id?: string | null
          collector?: string | null
          collector_id?: string | null
          cors_enabled?: boolean | null
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_collection_amount?: number | null
          emergency_collection_created_at?: string | null
          emergency_collection_due_date?: string | null
          emergency_collection_status?: string | null
          family_member_dob?: string | null
          family_member_gender?: string | null
          family_member_name?: string | null
          family_member_relationship?: string | null
          full_name: string
          gender?: string | null
          id?: string
          marital_status?: string | null
          member_number: string
          membership_type?: string | null
          payment_amount?: number | null
          payment_date?: string | null
          payment_notes?: string | null
          payment_type?: string | null
          phone?: string | null
          postcode?: string | null
          status?: string | null
          ticket_description?: string | null
          ticket_priority?: string | null
          ticket_status?: string | null
          ticket_subject?: string | null
          town?: string | null
          updated_at?: string
          verified?: boolean | null
          yearly_payment_amount?: number | null
          yearly_payment_due_date?: string | null
          yearly_payment_status?: string | null
        }
        Update: {
          address?: string | null
          admin_note?: string | null
          auth_user_id?: string | null
          collector?: string | null
          collector_id?: string | null
          cors_enabled?: boolean | null
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_collection_amount?: number | null
          emergency_collection_created_at?: string | null
          emergency_collection_due_date?: string | null
          emergency_collection_status?: string | null
          family_member_dob?: string | null
          family_member_gender?: string | null
          family_member_name?: string | null
          family_member_relationship?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          marital_status?: string | null
          member_number?: string
          membership_type?: string | null
          payment_amount?: number | null
          payment_date?: string | null
          payment_notes?: string | null
          payment_type?: string | null
          phone?: string | null
          postcode?: string | null
          status?: string | null
          ticket_description?: string | null
          ticket_priority?: string | null
          ticket_status?: string | null
          ticket_subject?: string | null
          town?: string | null
          updated_at?: string
          verified?: boolean | null
          yearly_payment_amount?: number | null
          yearly_payment_due_date?: string | null
          yearly_payment_status?: string | null
        }
        Relationships: []
      }
      members_collectors: {
        Row: {
          active: boolean | null
          created_at: string
          email: string | null
          id: string
          member_number: string | null
          name: string | null
          number: string | null
          phone: string | null
          prefix: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          id?: string
          member_number?: string | null
          name?: string | null
          number?: string | null
          phone?: string | null
          prefix?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          id?: string
          member_number?: string | null
          name?: string | null
          number?: string | null
          phone?: string | null
          prefix?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_collector_role: {
        Args: {
          member_id: string
          collector_name: string
          collector_prefix: string
          collector_number: string
        }
        Returns: string
      }
      generate_full_backup: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          name: string
          command: string
        }[]
      }
      get_tables_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          columns: Json
          rls_enabled: boolean
        }[]
      }
      is_admin: {
        Args: {
          user_uid: string
        }
        Returns: boolean
      }
      is_payment_overdue: {
        Args: {
          due_date: string
        }
        Returns: boolean
      }
      perform_user_roles_sync: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      restore_from_backup: {
        Args: {
          backup_data: Json
        }
        Returns: string
      }
      update_collector_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "collector" | "member"
      backup_operation_type: "backup" | "restore"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
