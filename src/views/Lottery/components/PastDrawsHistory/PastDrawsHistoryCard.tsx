import React from 'react'
import { Heading, Card, CardBody } from '@pizzafinance/ui-sdk'
import useI18n from 'hooks/useI18n'
import HistoryChart from './HistoryChart'
import Legend from './Legend'

const PastDrawsHistoryCard: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <Heading size="md" color="primary" style={{textAlign:"center"}}>{TranslateString(999, 'History')}</Heading>
        <Legend />
        <HistoryChart />
      </CardBody>
    </Card>
  )
}

export default PastDrawsHistoryCard
