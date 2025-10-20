import { S3ClientUploadHandler as S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24 } from '@payloadcms/storage-s3/client'
import { default as default_a62a4680a03e3fb5c446bfa0d955511e } from '@/components/admin/BulkAltTextGenerator'
import { default as default_f3d30925126ccfadaa4cfb9665f27775 } from '@/components/fields/AltTextGenerator'
import { default as default_9abf28e0791c9b6dbe3253e9d973e64f } from '@/components/fields/SeoGenerator'

export const importMap = {
	'@/components/fields/AltTextGenerator#default': default_f3d30925126ccfadaa4cfb9665f27775,
	'@/components/admin/BulkAltTextGenerator#default': default_a62a4680a03e3fb5c446bfa0d955511e,
	'@/components/fields/SeoGenerator#default': default_9abf28e0791c9b6dbe3253e9d973e64f,
	'@payloadcms/storage-s3/client#S3ClientUploadHandler': S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24,
}
