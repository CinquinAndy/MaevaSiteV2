import * as migration_20251021_230905_rename_date_to_published_date from './20251021_230905_rename_date_to_published_date'
import * as migration_20251023_convert_galery_to_hasmany from './20251023_convert_galery_to_hasmany'

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
]
