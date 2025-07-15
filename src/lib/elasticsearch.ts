
import { Client } from '@elastic/elasticsearch'

const node = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200'

export const esClient = new Client({ node })
