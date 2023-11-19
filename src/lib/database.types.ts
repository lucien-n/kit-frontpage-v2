export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          branch: string
          category: string
          created_at: string
          description: string
          name: string
          slug: string
          uid: string
        }
        Insert: {
          branch: string
          category: string
          created_at?: string
          description: string
          name: string
          slug: string
          uid?: string
        }
        Update: {
          branch?: string
          category?: string
          created_at?: string
          description?: string
          name?: string
          slug?: string
          uid?: string
        }
        Relationships: []
      }
      "projects-tags": {
        Row: {
          project_uid: string
          tag_uid: string
          uid: string
        }
        Insert: {
          project_uid: string
          tag_uid: string
          uid?: string
        }
        Update: {
          project_uid?: string
          tag_uid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects-tags_project_uid_fkey"
            columns: ["project_uid"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "projects-tags_tag_uid_fkey"
            columns: ["tag_uid"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["uid"]
          }
        ]
      }
      repos: {
        Row: {
          commit_author: string | null
          commit_date: string | null
          commit_message: string | null
          created_at: string | null
          name: string
          uid: string
          updated_at: string
        }
        Insert: {
          commit_author?: string | null
          commit_date?: string | null
          commit_message?: string | null
          created_at?: string | null
          name: string
          uid?: string
          updated_at?: string
        }
        Update: {
          commit_author?: string | null
          commit_date?: string | null
          commit_message?: string | null
          created_at?: string | null
          name?: string
          uid?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string
          label: string
          link: string | null
          uid: string
        }
        Insert: {
          color: string
          label: string
          link?: string | null
          uid?: string
        }
        Update: {
          color?: string
          label?: string
          link?: string | null
          uid?: string
        }
        Relationships: []
      }
      views: {
        Row: {
          count: number | null
          created_at: string | null
          id: number
          ignore: boolean | null
          info: string | null
          ip: string
          last_viewed: string | null
          uid: string
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          id?: number
          ignore?: boolean | null
          info?: string | null
          ip: string
          last_viewed?: string | null
          uid?: string
        }
        Update: {
          count?: number | null
          created_at?: string | null
          id?: number
          ignore?: boolean | null
          info?: string | null
          ip?: string
          last_viewed?: string | null
          uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: {
          client_ip: string
        }
        Returns: undefined
      }
      total_views: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
