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
          default_password_hash: string | null
          email: string | null
          email_verified: boolean | null
          family_member_dob: string | null
          family_member_gender: string | null
          family_member_name: string | null
          family_member_relationship: string | null
          first_time_login: boolean | null
          full_name: string
          gender: string | null
          id: string
          marital_status: string | null
          member_number: string
          membership_type: string | null
          password_changed: boolean | null
          payment_amount: number | null
          payment_date: string | null
          payment_notes: string | null
          payment_type: string | null
          phone: string | null
          postcode: string | null
          profile_completed: boolean | null
          profile_updated: boolean | null
          registration_completed: boolean | null
          registration_status: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          ticket_description: string | null
          ticket_priority: string | null
          ticket_status: string | null
          ticket_subject: string | null
          town: string | null
          updated_at: string
          verified: boolean | null
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
          default_password_hash?: string | null
          email?: string | null
          email_verified?: boolean | null
          family_member_dob?: string | null
          family_member_gender?: string | null
          family_member_name?: string | null
          family_member_relationship?: string | null
          first_time_login?: boolean | null
          full_name: string
          gender?: string | null
          id?: string
          marital_status?: string | null
          member_number: string
          membership_type?: string | null
          password_changed?: boolean | null
          payment_amount?: number | null
          payment_date?: string | null
          payment_notes?: string | null
          payment_type?: string | null
          phone?: string | null
          postcode?: string | null
          profile_completed?: boolean | null
          profile_updated?: boolean | null
          registration_completed?: boolean | null
          registration_status?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          ticket_description?: string | null
          ticket_priority?: string | null
          ticket_status?: string | null
          ticket_subject?: string | null
          town?: string | null
          updated_at?: string
          verified?: boolean | null
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
          default_password_hash?: string | null
          email?: string | null
          email_verified?: boolean | null
          family_member_dob?: string | null
          family_member_gender?: string | null
          family_member_name?: string | null
          family_member_relationship?: string | null
          first_time_login?: boolean | null
          full_name?: string
          gender?: string | null
          id?: string
          marital_status?: string | null
          member_number?: string
          membership_type?: string | null
          password_changed?: boolean | null
          payment_amount?: number | null
          payment_date?: string | null
          payment_notes?: string | null
          payment_type?: string | null
          phone?: string | null
          postcode?: string | null
          profile_completed?: boolean | null
          profile_updated?: boolean | null
          registration_completed?: boolean | null
          registration_status?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          ticket_description?: string | null
          ticket_priority?: string | null
          ticket_status?: string | null
          ticket_subject?: string | null
          town?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      members_collectors: {
        Row: {
          active: boolean | null
          collector_profile_id: string
          created_at: string
          email: string | null
          id: string
          member_profile_id: string
          name: string | null
          number: string | null
          phone: string | null
          prefix: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          collector_profile_id: string
          created_at?: string
          email?: string | null
          id?: string
          member_profile_id: string
          name?: string | null
          number?: string | null
          phone?: string | null
          prefix?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          collector_profile_id?: string
          created_at?: string
          email?: string | null
          id?: string
          member_profile_id?: string
          name?: string | null
          number?: string | null
          phone?: string | null
          prefix?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_collectors_collector_profile_id_fkey"
            columns: ["collector_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_collectors_member_profile_id_fkey"
            columns: ["member_profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      members_roles: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          auth_user_id: string
          collector_number: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          gender: string | null
          id: string
          is_active: boolean | null
          marital_status: string | null
          member_number: string
          membership_type: string | null
          phone: string | null
          postcode: string | null
          prefix: string | null
          status: string | null
          town: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          auth_user_id: string
          collector_number?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          marital_status?: string | null
          member_number: string
          membership_type?: string | null
          phone?: string | null
          postcode?: string | null
          prefix?: string | null
          status?: string | null
          town?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          auth_user_id?: string
          collector_number?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          marital_status?: string | null
          member_number?: string
          membership_type?: string | null
          phone?: string | null
          postcode?: string | null
          prefix?: string | null
          status?: string | null
          town?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_member:
        | {
            Args: {
              p_member_number: string
            }
            Returns: {
              id: string
              member_number: string
              auth_user_id: string
              full_name: string
              email: string
              role: string
            }[]
          }
        | {
            Args: {
              p_member_number: string
              p_password: string
            }
            Returns: {
              id: string
              member_number: string
              full_name: string
              email: string
              role: Database["public"]["Enums"]["user_role"]
            }[]
          }
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      current_user_is_collector: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_user_role: {
        Args: {
          user_auth_id: string
        }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      link_member_with_auth: {
        Args: {
          p_member_number: string
          p_auth_user_id: string
        }
        Returns: undefined
      }
      safely_upsert_profile: {
        Args: {
          p_auth_user_id: string
          p_member_number: string
          p_full_name: string
          p_email: string
        }
        Returns: {
          address: string | null
          auth_user_id: string
          collector_number: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          gender: string | null
          id: string
          is_active: boolean | null
          marital_status: string | null
          member_number: string
          membership_type: string | null
          phone: string | null
          postcode: string | null
          prefix: string | null
          status: string | null
          town: string | null
          updated_at: string
        }[]
      }
    }
    Enums: {
      user_role: "member" | "collector" | "admin"
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
