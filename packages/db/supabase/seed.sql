SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'f1946c9c-b26a-46de-a756-352a1fc83b5a', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:48:56.541408+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b10918d7-fc60-4e16-98aa-4ae03b663e6d', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:50:32.271109+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6534c0f-1506-4a05-9f1d-6f4b96afa3e2', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:50:36.591815+00', ''),
	('00000000-0000-0000-0000-000000000000', '58834629-66b1-4c17-8e26-0070dfb99f94', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:53:44.846847+00', ''),
	('00000000-0000-0000-0000-000000000000', '9e8b5b89-4908-44d4-a45e-909f70dc7375', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:54:19.638893+00', ''),
	('00000000-0000-0000-0000-000000000000', '57cb9ee4-9d67-470b-aefa-6b6b062c8c65', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:54:43.598789+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd734de0b-f4b4-41ac-8e26-cf0f9b75f4dd', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:55:57.463747+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5bc0a0b-83ac-4cc6-9939-3a9a01319e3c', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:57:25.27826+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3f2333e-4d79-4e5a-9082-1ec9334c3807', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 10:58:16.870737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbce796a-eb93-42f4-a5cf-e6600ca44bfd', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:00:20.711286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af8be368-8782-45b5-919e-fec48a9f8be4', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:01:24.662231+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf7bb2b0-0067-4bc3-9c67-00bf5d67a397', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:02:28.349543+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d4d652f-a555-453e-ab2a-41bc567b4fbc', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:04:08.104869+00', ''),
	('00000000-0000-0000-0000-000000000000', '24e4afc3-430d-4e1b-b3ad-8437cbed915b', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:08:07.623507+00', ''),
	('00000000-0000-0000-0000-000000000000', '58e9af6e-7b39-43f5-bc29-9fea00cdbedb', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:09:41.26203+00', ''),
	('00000000-0000-0000-0000-000000000000', '457c1ee1-abcd-4c1f-8ca0-46a382155f21', '{"action":"token_refreshed","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 11:47:12.098752+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1622967-34ee-497b-b9f8-b7313e2c776f', '{"action":"token_revoked","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 11:47:12.099323+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cafb123c-4801-432c-a60e-a334d80d716a', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:48:17.265564+00', ''),
	('00000000-0000-0000-0000-000000000000', '05228e1e-8755-4646-8d66-54b43c7d28ef', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:49:30.167159+00', ''),
	('00000000-0000-0000-0000-000000000000', '7072bca4-1e6b-4d7f-88c1-9b56fc03be53', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:49:34.246768+00', ''),
	('00000000-0000-0000-0000-000000000000', '43939359-81c6-481f-8313-f5035d080743', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:50:15.467503+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b70ccc11-1abd-4f5a-bb8d-df446d4d75f1', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:50:19.77332+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7939097-a6fe-41b1-aca7-d66434deaa9f', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:50:35.595274+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3a199f9-062c-488c-970b-75be323f5144', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:50:40.290444+00', ''),
	('00000000-0000-0000-0000-000000000000', '2be116b2-efb3-437d-8361-93fe8c26d944', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:52:41.939248+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae5b9643-6570-47af-8b9a-115776a577a8', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:52:45.470847+00', ''),
	('00000000-0000-0000-0000-000000000000', '66c1f7c3-ac10-451f-8d73-2879fda0360d', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:56:40.478382+00', ''),
	('00000000-0000-0000-0000-000000000000', 'beb86e10-1b04-42d8-917d-3fc294999a5f', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:56:43.915748+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fac5249f-d17e-4442-9fde-521f3f5f1cc4', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 11:57:40.704004+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ba95921-96b6-4d74-96ab-1e2658e98610', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 11:57:43.306837+00', ''),
	('00000000-0000-0000-0000-000000000000', '10f10b2c-a0b2-4e27-839c-2aa37a2b171f', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:04:28.375148+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f749e9a-6834-41df-a3b2-6a9c1ad1a254', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:04:32.211764+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1ffab44-27eb-45e9-82ab-e617d1d507a8', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:04:55.153058+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e369a1ce-86f9-4342-9914-6c5d679f0e0b', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:04:58.348816+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9fe2844-b3b5-483d-8b30-95bd2f18b717', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:07:29.661975+00', ''),
	('00000000-0000-0000-0000-000000000000', '4acb9e9e-792d-49b7-add6-c46e15b864da', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:07:32.76639+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2bd9920-5e4d-45dd-8ce9-abba455c1acf', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:07:46.72462+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b7e5c7e-7a68-4bf0-acf9-0249339a5c3f', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:07:49.541749+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ef6cd2d-6489-4b72-b7a7-946411599e29', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:49:06.714435+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea9ceece-3a46-4c5f-9a3e-624eab4782b2', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:50:59.418119+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9104f67-5acd-499a-9f2e-ca73a275774c', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:08:07.704435+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d019d0b-5e5e-4582-a1e1-57e0061c4e19', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:08:10.766841+00', ''),
	('00000000-0000-0000-0000-000000000000', '245048aa-af60-428b-b3c3-b004e3392b82', '{"action":"logout","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-04-19 12:21:17.546231+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bd11c54-aab8-41be-a94d-894016b2638d', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:21:26.131253+00', ''),
	('00000000-0000-0000-0000-000000000000', '3757c819-ab6f-4e1f-ba46-30eac5b26bc5', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:47:55.859896+00', ''),
	('00000000-0000-0000-0000-000000000000', '2558e32e-a159-44de-b7a5-5e8309a970bd', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:48:03.282398+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aed31e97-3c6a-49ce-8a87-cd14c8132635', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:48:24.080506+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b06f8bc9-49ba-4598-bcd7-7b5d3019bd9f', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:48:47.26313+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1f3f9c8-330f-4003-9fad-fb50133e0cc8', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:50:07.242016+00', ''),
	('00000000-0000-0000-0000-000000000000', '3312c969-6f2d-4c18-b41e-3ea6bf88fb97', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:50:31.616447+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2a4a4ec-f1ad-4c71-8a2a-43a25bae83ec', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:51:11.953088+00', ''),
	('00000000-0000-0000-0000-000000000000', '7479bc22-37af-454e-83d0-2559efcf894e', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:51:24.424358+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6292708-1f4e-4220-97cf-48255f16b5a1', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:52:32.262642+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd48f7b2f-a4c8-4ad1-a4fe-7122bc2163d9', '{"action":"login","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-19 12:52:35.155751+00', ''),
	('00000000-0000-0000-0000-000000000000', '7491f458-c82c-47e9-b9f5-9531a26bc335', '{"action":"token_refreshed","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 13:17:47.062406+00', ''),
	('00000000-0000-0000-0000-000000000000', '913b6cfb-0cb1-4ee7-92b3-bf54c044d5e7', '{"action":"token_revoked","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 13:17:47.062835+00', ''),
	('00000000-0000-0000-0000-000000000000', '462ec375-68a3-4aaf-8aea-328cb4fcb892', '{"action":"token_refreshed","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 14:16:12.953065+00', ''),
	('00000000-0000-0000-0000-000000000000', '451d4bf1-0a79-4c8c-a31d-f1786786bc9c', '{"action":"token_revoked","actor_id":"00000000-0000-0000-0000-000000000002","actor_username":"saneatsu.wakana@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 14:16:12.953495+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'saneatsu.wakana@gmail.com', '$2a$06$QqgHEz.u7THNd/iXNqERqO6rR1i0t1mKSqzHYwFxmPymUJbBt.UO6', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-04-19 12:52:35.156799+00', NULL, '{"username": "saneatsu", "avatar_url": "https://github.com/shadcn.png", "display_name": "Saneatsu Wakana"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-04-19 14:16:12.954554+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'nito.tech.official@gmail.com', '$2a$06$W287YMauGeGLile6oWDGbORHiJuz4yCd.ebQJP1d3VbjsFU90jZQi', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "nito", "avatar_url": "https://github.com/shadcn.png", "display_name": "Nito Tech"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'john.doe@example.com', '$2a$06$do4/mIt1rKFQfIV68xSzKeOZ8FSNpCv1azlSgVJfdxoo/ft0cjmEi', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "johndoe", "avatar_url": "https://github.com/shadcn.png", "display_name": "John Doe"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'jane.smith@example.com', '$2a$06$AHcKbm2EZsx/G8.Bofk00uhd/jpJJYO9tBmPBh//drV6jQbrqJRVC', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "janesmith", "avatar_url": "https://github.com/shadcn.png", "display_name": "Jane Smith"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'mike.johnson@example.com', '$2a$06$3tSANiO9SqxyFcsDa40.X.W3hxFYp1/x/NdGY9xAU/ErG3FxJEzXS', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "mikej", "avatar_url": "https://github.com/shadcn.png", "display_name": "Mike Johnson"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'sarah.wilson@example.com', '$2a$06$2DWOKgtb3aR6K44fVrDz3etZ9qyDbvSPAmQCTMaCEcqVKzltENCV.', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "sarahw", "avatar_url": "https://github.com/shadcn.png", "display_name": "Sarah Wilson"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated', 'david.brown@example.com', '$2a$06$xZdHTCeSLU9G1Y6Gj5Uzr.eggDWygpuqG9dnK4cUewdIbLWFy723C', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "davidb", "avatar_url": "https://github.com/shadcn.png", "display_name": "David Brown"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated', 'emily.davis@example.com', '$2a$06$7WvB5N9/Nbqdg5Nyy9EG1OuYl7krtlLHoJEdzZXtT2hzQHa3RrIxS', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "emilyd", "avatar_url": "https://github.com/shadcn.png", "display_name": "Emily Davis"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000009', 'authenticated', 'authenticated', 'chris.taylor@example.com', '$2a$06$EBh3RLjgP8IPUo9m6MKnTekQ1Wrd1UnNGkTDmkoEEDOzMV7aLEsZa', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "christ", "avatar_url": "https://github.com/shadcn.png", "display_name": "Chris Taylor"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated', 'lisa.anderson@example.com', '$2a$06$1E178PaU/SDVv/DlX6ahI.NFbMPgMYGuhXXZNDDFLQn.NGbTQFvlK', '2025-03-22 22:22:23.105643+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, NULL, '{"username": "lisaa", "avatar_url": "https://github.com/shadcn.png", "display_name": "Lisa Anderson"}', NULL, '2025-03-22 22:22:23.093826+00', '2025-03-22 22:22:58.384429+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('6fb362b0-5ecd-4ba7-99b5-f0174ad95100', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:47:55.862263+00', '2025-04-19 12:47:55.862263+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('37f7c628-1d01-4409-8895-9de5278327bb', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:48:03.284514+00', '2025-04-19 12:48:03.284514+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('e2debc01-0028-436c-ae7d-fafc3ec40688', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:48:24.081251+00', '2025-04-19 12:48:24.081251+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('b63225b7-c5ba-4602-a5b6-ba6c58b24c5f', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:48:47.263955+00', '2025-04-19 12:48:47.263955+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('1672528e-1866-4d15-a849-e1841f046528', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:49:06.715219+00', '2025-04-19 12:49:06.715219+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('56e2e474-608a-4238-abdc-088c0ed58e27', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:50:07.242934+00', '2025-04-19 12:50:07.242934+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('2f9e9c1b-d03b-4723-b7c0-947db8b2beb0', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:50:31.617259+00', '2025-04-19 12:50:31.617259+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('4e60059f-e958-434e-920c-45d255b4345f', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:50:59.419168+00', '2025-04-19 12:50:59.419168+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('30677452-4dfc-4c8e-8149-2b8e91b72cbe', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:51:11.953721+00', '2025-04-19 12:51:11.953721+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('19173ffe-5110-4fc5-a6e6-500ce0d125d3', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:51:24.425028+00', '2025-04-19 12:51:24.425028+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('56a5e210-a627-4f3c-a2d8-5b18fb2f8c59', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:52:32.26359+00', '2025-04-19 12:52:32.26359+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('15cd9f90-e560-4b4d-bdcd-21b45f41c4a4', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:52:35.156905+00', '2025-04-19 12:52:35.156905+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
	('3d2f1384-bd15-493d-a5a4-97e73d5a93eb', '00000000-0000-0000-0000-000000000002', '2025-04-19 12:21:26.131815+00', '2025-04-19 14:16:12.955092+00', NULL, 'aal1', NULL, '2025-04-19 14:16:12.955064', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('3d2f1384-bd15-493d-a5a4-97e73d5a93eb', '2025-04-19 12:21:26.133179+00', '2025-04-19 12:21:26.133179+00', 'password', 'b160733f-2509-4954-b27c-5ce47f3a00dc'),
	('6fb362b0-5ecd-4ba7-99b5-f0174ad95100', '2025-04-19 12:47:55.86594+00', '2025-04-19 12:47:55.86594+00', 'password', '8f16d976-0712-40bc-8aa7-d7607ae0178d'),
	('37f7c628-1d01-4409-8895-9de5278327bb', '2025-04-19 12:48:03.288596+00', '2025-04-19 12:48:03.288596+00', 'password', '97e59755-7a4f-478e-a9de-4969f33b10a3'),
	('e2debc01-0028-436c-ae7d-fafc3ec40688', '2025-04-19 12:48:24.084004+00', '2025-04-19 12:48:24.084004+00', 'password', '049c7032-2498-45c5-82ab-b9e7379df591'),
	('b63225b7-c5ba-4602-a5b6-ba6c58b24c5f', '2025-04-19 12:48:47.265435+00', '2025-04-19 12:48:47.265435+00', 'password', '3a0444ab-2749-4bee-a8bb-1ce1f3098fea'),
	('1672528e-1866-4d15-a849-e1841f046528', '2025-04-19 12:49:06.718488+00', '2025-04-19 12:49:06.718488+00', 'password', '7a149ed7-196f-46f2-839d-f0b4c90453c4'),
	('56e2e474-608a-4238-abdc-088c0ed58e27', '2025-04-19 12:50:07.244321+00', '2025-04-19 12:50:07.244321+00', 'password', '7784f6d3-a979-4a0b-94f2-6556865d58fc'),
	('2f9e9c1b-d03b-4723-b7c0-947db8b2beb0', '2025-04-19 12:50:31.618567+00', '2025-04-19 12:50:31.618567+00', 'password', 'adf3bbb8-bc7a-47ba-9d98-b266d95f9aae'),
	('4e60059f-e958-434e-920c-45d255b4345f', '2025-04-19 12:50:59.42115+00', '2025-04-19 12:50:59.42115+00', 'password', '4539f098-d7ae-4cb9-9d01-d6e1572fc14f'),
	('30677452-4dfc-4c8e-8149-2b8e91b72cbe', '2025-04-19 12:51:11.955069+00', '2025-04-19 12:51:11.955069+00', 'password', '14e1caed-81e6-4c39-850e-ecc1ad38ff99'),
	('19173ffe-5110-4fc5-a6e6-500ce0d125d3', '2025-04-19 12:51:24.426048+00', '2025-04-19 12:51:24.426048+00', 'password', '85cf4d20-b1b0-4b58-9f9d-4995b6767f78'),
	('56a5e210-a627-4f3c-a2d8-5b18fb2f8c59', '2025-04-19 12:52:32.265063+00', '2025-04-19 12:52:32.265063+00', 'password', '31f12907-9770-4a31-85e0-b95198f3756f'),
	('15cd9f90-e560-4b4d-bdcd-21b45f41c4a4', '2025-04-19 12:52:35.159024+00', '2025-04-19 12:52:35.159024+00', 'password', '53001051-b8c6-4311-aa93-266e2d134f6a');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 30, '8VGgqInNYt07sRDIe-Mjcw', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:47:55.864315+00', '2025-04-19 12:47:55.864315+00', NULL, '6fb362b0-5ecd-4ba7-99b5-f0174ad95100'),
	('00000000-0000-0000-0000-000000000000', 31, 'F8mDLeNdIonqhIFUJh1D6Q', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:48:03.285894+00', '2025-04-19 12:48:03.285894+00', NULL, '37f7c628-1d01-4409-8895-9de5278327bb'),
	('00000000-0000-0000-0000-000000000000', 32, 'TioDeeooj5I09t2TV4zyfw', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:48:24.081785+00', '2025-04-19 12:48:24.081785+00', NULL, 'e2debc01-0028-436c-ae7d-fafc3ec40688'),
	('00000000-0000-0000-0000-000000000000', 33, 'gAiWzSFUdwbJq1lnfp6DAQ', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:48:47.264526+00', '2025-04-19 12:48:47.264526+00', NULL, 'b63225b7-c5ba-4602-a5b6-ba6c58b24c5f'),
	('00000000-0000-0000-0000-000000000000', 34, 'Y6SobYHeFnFiAjym9ogCaQ', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:49:06.715873+00', '2025-04-19 12:49:06.715873+00', NULL, '1672528e-1866-4d15-a849-e1841f046528'),
	('00000000-0000-0000-0000-000000000000', 35, 'uJDSCWLQZ-5Tb9nn0P8xNQ', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:50:07.243557+00', '2025-04-19 12:50:07.243557+00', NULL, '56e2e474-608a-4238-abdc-088c0ed58e27'),
	('00000000-0000-0000-0000-000000000000', 36, '5thQjPnS1eRtUQf3OnyzMg', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:50:31.61775+00', '2025-04-19 12:50:31.61775+00', NULL, '2f9e9c1b-d03b-4723-b7c0-947db8b2beb0'),
	('00000000-0000-0000-0000-000000000000', 37, 'C0DP0jtPur54QvR-YFf68A', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:50:59.419776+00', '2025-04-19 12:50:59.419776+00', NULL, '4e60059f-e958-434e-920c-45d255b4345f'),
	('00000000-0000-0000-0000-000000000000', 38, '9WfMKVMJXzE7lFnHyZ4WiQ', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:51:11.954252+00', '2025-04-19 12:51:11.954252+00', NULL, '30677452-4dfc-4c8e-8149-2b8e91b72cbe'),
	('00000000-0000-0000-0000-000000000000', 39, 'AMFYkidlr2ilvK8RorY3Jw', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:51:24.425404+00', '2025-04-19 12:51:24.425404+00', NULL, '19173ffe-5110-4fc5-a6e6-500ce0d125d3'),
	('00000000-0000-0000-0000-000000000000', 40, 'alvBNIaollSwCigdRxeV5w', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:52:32.26415+00', '2025-04-19 12:52:32.26415+00', NULL, '56a5e210-a627-4f3c-a2d8-5b18fb2f8c59'),
	('00000000-0000-0000-0000-000000000000', 41, 'Ik3zVNOBWGieDIEdLMM-Rg', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 12:52:35.157791+00', '2025-04-19 12:52:35.157791+00', NULL, '15cd9f90-e560-4b4d-bdcd-21b45f41c4a4'),
	('00000000-0000-0000-0000-000000000000', 29, 'kxK1aoAFco_3Q_6jrhzZvA', '00000000-0000-0000-0000-000000000002', true, '2025-04-19 12:21:26.132287+00', '2025-04-19 13:17:47.063105+00', NULL, '3d2f1384-bd15-493d-a5a4-97e73d5a93eb'),
	('00000000-0000-0000-0000-000000000000', 42, 'dy9N2MLLPgHcHhcn7KhcVQ', '00000000-0000-0000-0000-000000000002', true, '2025-04-19 13:17:47.063387+00', '2025-04-19 14:16:12.953819+00', 'kxK1aoAFco_3Q_6jrhzZvA', '3d2f1384-bd15-493d-a5a4-97e73d5a93eb'),
	('00000000-0000-0000-0000-000000000000', 43, 'TzLDrqmYujcAeEt4DLlpFQ', '00000000-0000-0000-0000-000000000002', false, '2025-04-19 14:16:12.9541+00', '2025-04-19 14:16:12.9541+00', 'dy9N2MLLPgHcHhcn7KhcVQ', '3d2f1384-bd15-493d-a5a4-97e73d5a93eb');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizations" ("id", "name", "slug", "description", "avatar_url", "created_at", "updated_at") VALUES
	('00000000-0000-0000-0000-000000000010', 'Nito Inc', 'nito', 'Nito', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000011', 'Apple Inc', 'apple', 'Think Different', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000012', 'Microsoft Corporation', 'microsoft', 'Empowering every person and every organization on the planet to achieve more', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000013', 'Google LLC', 'google', 'Don''t be evil', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000014', 'Amazon Inc', 'amazon', 'Work hard, have fun, make history', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000015', 'Meta Platforms Inc', 'meta', 'Connect with friends and the world around you on Facebook', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000016', 'Netflix Inc', 'netflix', 'See what''s next', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000017', 'Tesla Inc', 'tesla', 'Accelerate the world''s transition to sustainable energy', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000018', 'NVIDIA Corporation', 'nvidia', 'The pioneer of GPU-accelerated computing', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000019', 'Adobe Inc', 'adobe', 'Creativity for all', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000020', 'Salesforce Inc', 'salesforce', 'We bring companies and customers together', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000021', 'Intel Corporation', 'intel', 'Intel inside', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000022', 'AMD Inc', 'amd', 'The future of computing', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000023', 'Oracle Corporation', 'oracle', 'Oracle Cloud Infrastructure', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000024', 'IBM Corporation', 'ibm', 'Let''s put smart to work', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000025', 'Cisco Systems Inc', 'cisco', 'The bridge to possible', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000026', 'Qualcomm Inc', 'qualcomm', 'Inventing the technology the world loves', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000027', 'Samsung Electronics', 'samsung', 'Do what you can''t', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000028', 'Sony Group Corporation', 'sony', 'Make. Believe', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000029', 'Dell Technologies', 'dell', 'The power to do more', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00'),
	('00000000-0000-0000-0000-000000000030', 'HP Inc', 'hp', 'Keep reinventing', 'https://github.com/shadcn.png', '2025-04-19 10:21:52.061+00', '2025-04-19 10:48:47.871+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "username", "display_name", "email", "avatar_url", "created_at", "updated_at") VALUES
	('00000000-0000-0000-0000-000000000001', 'nito', 'Nito Tech', 'nito.tech.official@gmail.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000002', 'saneatsu', 'Saneatsu Wakana', 'saneatsu.wakana@gmail.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000003', 'johndoe', 'John Doe', 'john.doe@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000004', 'janesmith', 'Jane Smith', 'jane.smith@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000005', 'mikej', 'Mike Johnson', 'mike.johnson@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000006', 'sarahw', 'Sarah Wilson', 'sarah.wilson@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000007', 'davidb', 'David Brown', 'david.brown@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000008', 'emilyd', 'Emily Davis', 'emily.davis@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000009', 'christ', 'Chris Taylor', 'chris.taylor@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00'),
	('00000000-0000-0000-0000-000000000010', 'lisaa', 'Lisa Anderson', 'lisa.anderson@example.com', 'https://github.com/shadcn.png', '2025-03-22 22:22:23.093+00', '2025-03-22 22:22:58.384+00');


--
-- Data for Name: organization_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organization_members" ("id", "organization_id", "profile_id", "role", "created_at", "updated_at") VALUES
	('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000065', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000066', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000067', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000068', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000069', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000075', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000076', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000077', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000078', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000079', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000002', 'DEVELOPER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000003', 'BILLING', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00'),
	('00000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000004', 'VIEWER', '2025-04-19 10:46:27.232+00', '2025-04-19 10:48:47.875+00');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."projects" ("id", "name", "description", "organization_id", "created_at", "updated_at") VALUES
	('00000000-0000-0000-0000-000000000001', 'nito-core', 'nito-core project for Nito Inc', '00000000-0000-0000-0000-000000000010', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000002', 'nito-api', 'nito-api project for Nito Inc', '00000000-0000-0000-0000-000000000010', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000003', 'nito-web', 'nito-web project for Nito Inc', '00000000-0000-0000-0000-000000000010', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000004', 'apple-core', 'apple-core project for Apple Inc', '00000000-0000-0000-0000-000000000011', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000005', 'apple-api', 'apple-api project for Apple Inc', '00000000-0000-0000-0000-000000000011', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000006', 'apple-web', 'apple-web project for Apple Inc', '00000000-0000-0000-0000-000000000011', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000007', 'microsoft-core', 'microsoft-core project for Microsoft Corporation', '00000000-0000-0000-0000-000000000012', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000008', 'microsoft-api', 'microsoft-api project for Microsoft Corporation', '00000000-0000-0000-0000-000000000012', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000009', 'microsoft-web', 'microsoft-web project for Microsoft Corporation', '00000000-0000-0000-0000-000000000012', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000010', 'google-core', 'google-core project for Google LLC', '00000000-0000-0000-0000-000000000013', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000011', 'google-api', 'google-api project for Google LLC', '00000000-0000-0000-0000-000000000013', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000012', 'google-web', 'google-web project for Google LLC', '00000000-0000-0000-0000-000000000013', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000013', 'amazon-core', 'amazon-core project for Amazon Inc', '00000000-0000-0000-0000-000000000014', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000014', 'amazon-api', 'amazon-api project for Amazon Inc', '00000000-0000-0000-0000-000000000014', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000015', 'amazon-web', 'amazon-web project for Amazon Inc', '00000000-0000-0000-0000-000000000014', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000016', 'meta-core', 'meta-core project for Meta Platforms Inc', '00000000-0000-0000-0000-000000000015', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000017', 'meta-api', 'meta-api project for Meta Platforms Inc', '00000000-0000-0000-0000-000000000015', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000018', 'meta-web', 'meta-web project for Meta Platforms Inc', '00000000-0000-0000-0000-000000000015', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000019', 'netflix-core', 'netflix-core project for Netflix Inc', '00000000-0000-0000-0000-000000000016', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000020', 'netflix-api', 'netflix-api project for Netflix Inc', '00000000-0000-0000-0000-000000000016', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000021', 'netflix-web', 'netflix-web project for Netflix Inc', '00000000-0000-0000-0000-000000000016', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000022', 'tesla-core', 'tesla-core project for Tesla Inc', '00000000-0000-0000-0000-000000000017', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000023', 'tesla-api', 'tesla-api project for Tesla Inc', '00000000-0000-0000-0000-000000000017', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000024', 'tesla-web', 'tesla-web project for Tesla Inc', '00000000-0000-0000-0000-000000000017', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000025', 'nvidia-core', 'nvidia-core project for NVIDIA Corporation', '00000000-0000-0000-0000-000000000018', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000026', 'nvidia-api', 'nvidia-api project for NVIDIA Corporation', '00000000-0000-0000-0000-000000000018', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000027', 'nvidia-web', 'nvidia-web project for NVIDIA Corporation', '00000000-0000-0000-0000-000000000018', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000028', 'adobe-core', 'adobe-core project for Adobe Inc', '00000000-0000-0000-0000-000000000019', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000029', 'adobe-api', 'adobe-api project for Adobe Inc', '00000000-0000-0000-0000-000000000019', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000030', 'adobe-web', 'adobe-web project for Adobe Inc', '00000000-0000-0000-0000-000000000019', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000031', 'salesforce-core', 'salesforce-core project for Salesforce Inc', '00000000-0000-0000-0000-000000000020', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000032', 'salesforce-api', 'salesforce-api project for Salesforce Inc', '00000000-0000-0000-0000-000000000020', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000033', 'salesforce-web', 'salesforce-web project for Salesforce Inc', '00000000-0000-0000-0000-000000000020', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000034', 'intel-core', 'intel-core project for Intel Corporation', '00000000-0000-0000-0000-000000000021', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000035', 'intel-api', 'intel-api project for Intel Corporation', '00000000-0000-0000-0000-000000000021', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000036', 'intel-web', 'intel-web project for Intel Corporation', '00000000-0000-0000-0000-000000000021', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000037', 'amd-core', 'amd-core project for AMD Inc', '00000000-0000-0000-0000-000000000022', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000038', 'amd-api', 'amd-api project for AMD Inc', '00000000-0000-0000-0000-000000000022', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000039', 'amd-web', 'amd-web project for AMD Inc', '00000000-0000-0000-0000-000000000022', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000040', 'oracle-core', 'oracle-core project for Oracle Corporation', '00000000-0000-0000-0000-000000000023', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000041', 'oracle-api', 'oracle-api project for Oracle Corporation', '00000000-0000-0000-0000-000000000023', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000042', 'oracle-web', 'oracle-web project for Oracle Corporation', '00000000-0000-0000-0000-000000000023', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000043', 'ibm-core', 'ibm-core project for IBM Corporation', '00000000-0000-0000-0000-000000000024', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000044', 'ibm-api', 'ibm-api project for IBM Corporation', '00000000-0000-0000-0000-000000000024', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000045', 'ibm-web', 'ibm-web project for IBM Corporation', '00000000-0000-0000-0000-000000000024', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000046', 'cisco-core', 'cisco-core project for Cisco Systems Inc', '00000000-0000-0000-0000-000000000025', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000047', 'cisco-api', 'cisco-api project for Cisco Systems Inc', '00000000-0000-0000-0000-000000000025', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000048', 'cisco-web', 'cisco-web project for Cisco Systems Inc', '00000000-0000-0000-0000-000000000025', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000049', 'qualcomm-core', 'qualcomm-core project for Qualcomm Inc', '00000000-0000-0000-0000-000000000026', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000050', 'qualcomm-api', 'qualcomm-api project for Qualcomm Inc', '00000000-0000-0000-0000-000000000026', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000051', 'qualcomm-web', 'qualcomm-web project for Qualcomm Inc', '00000000-0000-0000-0000-000000000026', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000052', 'samsung-core', 'samsung-core project for Samsung Electronics', '00000000-0000-0000-0000-000000000027', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000053', 'samsung-api', 'samsung-api project for Samsung Electronics', '00000000-0000-0000-0000-000000000027', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000054', 'samsung-web', 'samsung-web project for Samsung Electronics', '00000000-0000-0000-0000-000000000027', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000055', 'sony-core', 'sony-core project for Sony Group Corporation', '00000000-0000-0000-0000-000000000028', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000056', 'sony-api', 'sony-api project for Sony Group Corporation', '00000000-0000-0000-0000-000000000028', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000057', 'sony-web', 'sony-web project for Sony Group Corporation', '00000000-0000-0000-0000-000000000028', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000058', 'dell-core', 'dell-core project for Dell Technologies', '00000000-0000-0000-0000-000000000029', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000059', 'dell-api', 'dell-api project for Dell Technologies', '00000000-0000-0000-0000-000000000029', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000060', 'dell-web', 'dell-web project for Dell Technologies', '00000000-0000-0000-0000-000000000029', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000061', 'hp-core', 'hp-core project for HP Inc', '00000000-0000-0000-0000-000000000030', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000062', 'hp-api', 'hp-api project for HP Inc', '00000000-0000-0000-0000-000000000030', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00'),
	('00000000-0000-0000-0000-000000000063', 'hp-web', 'hp-web project for HP Inc', '00000000-0000-0000-0000-000000000030', '2025-04-19 10:46:48.658+00', '2025-04-19 10:48:47.879+00');


--
-- Data for Name: project_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."project_members" ("id", "project_id", "member_id", "role", "created_at", "updated_at") VALUES
	('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000006', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000007', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000007', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000005', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000007', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000009', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000010', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000011', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000009', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000010', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000011', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000009', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000010', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000011', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000013', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000014', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000015', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.885+00'),
	('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000013', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000014', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000015', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000013', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000014', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000015', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000017', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000018', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000019', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000017', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000018', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000019', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000017', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000018', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000019', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000021', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000022', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000023', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000021', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000022', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000023', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000021', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000022', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000023', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000025', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000026', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000027', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000025', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000026', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000027', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000025', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000026', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000027', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000029', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000065', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000030', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000066', '00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000031', 'VIEWER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000067', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000029', 'OWNER', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000068', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000030', 'EDITOR', '2025-04-19 10:47:28.297+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000069', '00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000031', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000029', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000030', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000031', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000033', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000034', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000075', '00000000-0000-0000-0000-000000000025', '00000000-0000-0000-0000-000000000035', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000076', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000033', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000077', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000034', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000078', '00000000-0000-0000-0000-000000000026', '00000000-0000-0000-0000-000000000035', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000079', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000033', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000034', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000027', '00000000-0000-0000-0000-000000000035', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000037', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000038', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000028', '00000000-0000-0000-0000-000000000039', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000085', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000037', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000086', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000038', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000087', '00000000-0000-0000-0000-000000000029', '00000000-0000-0000-0000-000000000039', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000088', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000037', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000089', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000038', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000039', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000091', '00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000041', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000042', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000093', '00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000043', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000094', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000041', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000095', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000042', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000096', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000043', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000041', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000098', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000042', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000099', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000043', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000045', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000046', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000034', '00000000-0000-0000-0000-000000000047', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000045', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000046', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000035', '00000000-0000-0000-0000-000000000047', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000106', '00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000045', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000107', '00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000046', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000108', '00000000-0000-0000-0000-000000000036', '00000000-0000-0000-0000-000000000047', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000109', '00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000049', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000050', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0000-000000000037', '00000000-0000-0000-0000-000000000051', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000049', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000050', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000114', '00000000-0000-0000-0000-000000000038', '00000000-0000-0000-0000-000000000051', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000115', '00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000049', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000116', '00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000050', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000117', '00000000-0000-0000-0000-000000000039', '00000000-0000-0000-0000-000000000051', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000118', '00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000053', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000119', '00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000054', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000120', '00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000055', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000053', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000054', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000123', '00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000055', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000124', '00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000053', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000125', '00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000054', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000126', '00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000055', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000127', '00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000057', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000128', '00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000058', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000129', '00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000059', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000130', '00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000057', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000131', '00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000058', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000132', '00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000059', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000133', '00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000057', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000134', '00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000058', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000135', '00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000059', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000136', '00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000061', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000137', '00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000062', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000138', '00000000-0000-0000-0000-000000000046', '00000000-0000-0000-0000-000000000063', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000139', '00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000061', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000140', '00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000062', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000141', '00000000-0000-0000-0000-000000000047', '00000000-0000-0000-0000-000000000063', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000142', '00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000061', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000143', '00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000062', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000144', '00000000-0000-0000-0000-000000000048', '00000000-0000-0000-0000-000000000063', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000145', '00000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000065', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000146', '00000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000066', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000147', '00000000-0000-0000-0000-000000000049', '00000000-0000-0000-0000-000000000067', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000148', '00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000065', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000149', '00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000066', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000150', '00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000067', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000151', '00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000065', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000152', '00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000066', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000153', '00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000067', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000154', '00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000069', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000155', '00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000070', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000156', '00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000071', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000157', '00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000069', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000158', '00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000070', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000159', '00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000071', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000160', '00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000069', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000161', '00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000070', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000162', '00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000071', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000163', '00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000073', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000164', '00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000074', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000165', '00000000-0000-0000-0000-000000000055', '00000000-0000-0000-0000-000000000075', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000166', '00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000073', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000167', '00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000074', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000168', '00000000-0000-0000-0000-000000000056', '00000000-0000-0000-0000-000000000075', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000169', '00000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000073', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000170', '00000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000074', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000171', '00000000-0000-0000-0000-000000000057', '00000000-0000-0000-0000-000000000075', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000172', '00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000077', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000173', '00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000078', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000174', '00000000-0000-0000-0000-000000000058', '00000000-0000-0000-0000-000000000079', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000175', '00000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000077', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000176', '00000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000078', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000177', '00000000-0000-0000-0000-000000000059', '00000000-0000-0000-0000-000000000079', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000178', '00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000077', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000179', '00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000078', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000180', '00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000079', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000181', '00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000081', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000182', '00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000082', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000183', '00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000083', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000184', '00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000081', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000185', '00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000082', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000186', '00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000083', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000187', '00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000081', 'OWNER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000188', '00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000082', 'EDITOR', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00'),
	('00000000-0000-0000-0000-000000000189', '00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000083', 'VIEWER', '2025-04-19 10:47:28.298+00', '2025-04-19 10:48:47.886+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--



--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--



--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- PostgreSQL database dump complete
--

RESET ALL;
