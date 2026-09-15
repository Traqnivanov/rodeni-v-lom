// Родени в Лом — конфигурация на Supabase връзката
// Използва се само публичният ("publishable") ключ — безопасен за показване в браузъра.
// Никога не слагай тук service_role/таен ключ.

window.RODENI_SUPABASE_URL = 'https://mqilvavuzbsscsfhtuub.supabase.co';
window.RODENI_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_WUpR0jcun_nDtwX6HPHVVQ_oOhck_rI';

window.rodeniSupabase = supabase.createClient(
  window.RODENI_SUPABASE_URL,
  window.RODENI_SUPABASE_PUBLISHABLE_KEY
);
