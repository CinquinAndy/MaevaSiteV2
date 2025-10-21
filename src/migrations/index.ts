import * as migration_20251021_230905_rename_date_to_published_date from './20251021_230905_rename_date_to_published_date'

export const migrations = [
	{
		up: migration_20251021_230905_rename_date_to_published_date.up,
		down: migration_20251021_230905_rename_date_to_published_date.down,
		name: '20251021_230905_rename_date_to_published_date',
	},
]
