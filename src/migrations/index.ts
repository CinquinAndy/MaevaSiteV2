import * as migration_20251021_230905_rename_date_to_published_date from './20251021_230905_rename_date_to_published_date'
import * as migration_20251023_convert_galery_to_hasmany from './20251023_convert_galery_to_hasmany'
import * as migration_20261013_174858_payload_3_90_columns from './20261013_174858_payload_3_90_columns'

export const migrations = [
	{
		up: migration_20251021_230905_rename_date_to_published_date.up,
		down: migration_20251021_230905_rename_date_to_published_date.down,
		name: '20251021_230905_rename_date_to_published_date',
	},
	{
		up: migration_20251023_convert_galery_to_hasmany.up,
		down: migration_20251023_convert_galery_to_hasmany.down,
		name: '20251023_convert_galery_to_hasmany',
	},
	{
		up: migration_20261013_174858_payload_3_90_columns.up,
		down: migration_20261013_174858_payload_3_90_columns.down,
		name: '20261013_174858_payload_3_90_columns',
	},
]
