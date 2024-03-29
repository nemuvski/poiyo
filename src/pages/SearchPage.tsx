import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePageTitle } from '~/hooks/usePageTitle'
import BoardList from '~/components/BoardList'
import searchIcon from '~/assets/icons/search-form.svg'
import AnalyticsTracking from '~/utilities/AnalyticsTracking'
import '~/styles/pages/page-search.scss'

type SearchFormFields = {
  keyword: string
}

const SearchPage: React.FC = () => {
  usePageTitle('ボードを探す')
  const { handleSubmit, formState, register } = useForm()
  const [keyword, setKeyword] = useState('')

  const onSubmit = useCallback((data: SearchFormFields) => {
    setKeyword(data.keyword)
    AnalyticsTracking.search(data.keyword)
  }, [])

  return (
    <div className='page-search'>
      <form className='page-search__form' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          maxLength={200}
          tabIndex={0}
          placeholder='ボードのタイトルで探す'
          className='page-search__form-keyword'
          {...register('keyword')}
        />
        <button type='submit' className='page-search__form-submit is-black' disabled={formState.isSubmitting}>
          <img src={searchIcon} alt='検索' />
        </button>
      </form>

      <BoardList keyword={keyword} />
    </div>
  )
}

export default SearchPage
