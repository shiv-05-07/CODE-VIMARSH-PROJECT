/// <reference path="../.astro/types.d.ts" />

declare module '@supabase/supabase-js' {
  export interface SupabaseClient {
    from(table: string): any;
  }
  export function createClient(url: string, key: string): SupabaseClient;
}

declare global {
  interface SDKTypeMode {
    strict: true;
  }
}