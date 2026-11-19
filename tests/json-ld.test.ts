import { describe, expect, test } from 'bun:test'
import { serializeJsonLd } from '@/lib/seo/json-ld'

describe('serializeJsonLd', () => {
	test('un texte contenant </script> ne ferme pas la balise', () => {
		const sortie = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
		expect(sortie).not.toContain('</script>')
		expect(JSON.parse(sortie)).toEqual({ name: '</script><script>alert(1)</script>' })
	})
})
