import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import AccountForm from '../common/form/AccountForm'
import TaskTypeForm from '../common/form/TaskTypeForm'
import FilterForm from '../common/form/FilterForm'
import ContestTypeForm from '../common/form/ContestTypeForm'
import YearForm from '../common/form/YearForm'
import FormButton from '../common/form/FormButton'
import styles from './SearchForm.scss'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myAccount: { atcoder: '', aoj: '' },
      rivalAccount: { atcoder: '', aoj: '' },
      taskType: { batch: true, communication: true, outputOnly: false },
      hideFilter: { hideACTask: false, hideNotExistTask: false, hideLevel: false },
      contestType: { prelim: true, final: true, springCamp: true, open: false },
      year: { begin: '2007', end: 'latest' },
    }
  }

  componentDidMount() {
    this.onSubmit()
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit() {
    const { onSubmit } = this.props
    const { myAccount, rivalAccount, taskType, hideFilter, contestType, year } = this.state

    const input = { myAccount, rivalAccount, taskType, hideFilter, contestType, year }

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { myAccount, rivalAccount, taskType, hideFilter, contestType, year } = this.state
    const { busy } = this.props

    return (
      <Form>
        <AccountForm
          title='自分'
          value={myAccount}
          onUpdate={(v) => this.onUpdate('myAccount', v)}
        />
        <AccountForm
          title='ライバル'
          value={rivalAccount}
          onUpdate={(v) => this.onUpdate('rivalAccount', v)}
        />
        <TaskTypeForm
          value={taskType}
          onUpdate={(v) => this.onUpdate('taskType', v)}
        />
        <FilterForm
          value={hideFilter}
          onUpdate={(v) => this.onUpdate('hideFilter', v)}
        />
        <ContestTypeForm
          value={contestType}
          onUpdate={(v) => this.onUpdate('contestType', v)}
        />
        <YearForm
          value={year}
          onUpdate={(v) => this.onUpdate('year', v)}
        />

        <FormButton
          variant='info'
          onClick={this.onSubmit.bind(this)}
          busy={busy}
        >
          表示
        </FormButton>
      </Form>
    )
  }
}

export default SearchForm