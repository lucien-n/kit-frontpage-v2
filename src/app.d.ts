import type { Project } from '$lib/types';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type TProject = Project;

	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
