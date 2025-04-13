export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			members: {
				Row: {
					id: string;
					is_active: boolean;
					joined_at: string;
					last_active_at: string;
					organization_id: string;
					role: string;
					user_id: string;
				};
				Insert: {
					id?: string;
					is_active?: boolean;
					joined_at?: string;
					last_active_at?: string;
					organization_id: string;
					role: string;
					user_id: string;
				};
				Update: {
					id?: string;
					is_active?: boolean;
					joined_at?: string;
					last_active_at?: string;
					organization_id?: string;
					role?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "members_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
				];
			};
			organizations: {
				Row: {
					created_at: string;
					created_by: string | null;
					description: string | null;
					domain: string | null;
					id: string;
					is_active: boolean;
					logo_url: string | null;
					name: string;
					slug: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					domain?: string | null;
					id?: string;
					is_active?: boolean;
					logo_url?: string | null;
					name: string;
					slug: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					domain?: string | null;
					id?: string;
					is_active?: boolean;
					logo_url?: string | null;
					name?: string;
					slug?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created_at: string | null;
					display_name: string | null;
					email: string | null;
					id: string;
					updated_at: string | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string | null;
					display_name?: string | null;
					email?: string | null;
					id: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string | null;
					display_name?: string | null;
					email?: string | null;
					id?: string;
					updated_at?: string | null;
					username?: string | null;
				};
				Relationships: [];
			};
			projects: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					organization_id: string;
					status: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					organization_id: string;
					status?: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					organization_id?: string;
					status?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "projects_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {},
	},
} as const;

// Schema: graphql_public
// Functions
export type ArgsGraphql =
	Database["graphql_public"]["Functions"]["graphql"]["Args"];
export type ReturnTypeGraphql =
	Database["graphql_public"]["Functions"]["graphql"]["Returns"];

// Schema: public
// Tables
export type Member = Database["public"]["Tables"]["members"]["Row"];
export type InsertMember = Database["public"]["Tables"]["members"]["Insert"];
export type UpdateMember = Database["public"]["Tables"]["members"]["Update"];

export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
export type InsertOrganization =
	Database["public"]["Tables"]["organizations"]["Insert"];
export type UpdateOrganization =
	Database["public"]["Tables"]["organizations"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type InsertProject = Database["public"]["Tables"]["projects"]["Insert"];
export type UpdateProject = Database["public"]["Tables"]["projects"]["Update"];
