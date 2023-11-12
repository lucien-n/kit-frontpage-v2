import type { Database } from '$lib/database.types';
import type { Project } from '$lib/types';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type TProject = Database['public']['Tables']['projects']['Row'];
	type TTag = Database['public']['Tables']['tags']['Row'];

	type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
	type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
	type DbResultErr = PostgrestError;

	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}
