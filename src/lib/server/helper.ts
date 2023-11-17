import type { Session } from '@supabase/supabase-js';

type CheckSessionReturnType<T> = T extends null
	? { session?: undefined; response: Response }
	: { session: T; response?: undefined };

export const checkSession = <T extends Session>(
	session: Session | null
): CheckSessionReturnType<T> => {
	if (!session)
		return {
			response: new Response(null, { status: 401, statusText: 'Unauthorized' })
		} as CheckSessionReturnType<T>;
	return { session } as CheckSessionReturnType<T>;
};
