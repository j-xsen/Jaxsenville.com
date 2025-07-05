export {Layout}

import React from 'react'
import PageTitleButton from '../../../components/PageTitleButton'

import {useData} from "vike-react/useData"
import type {Data} from '../+data'

function Layout({children}: { children: React.ReactNode }) {
    const data = useData<Data>()
    return (
        <>
            <PageTitleButton text={data.path}/>
            <div className="Gallery">
                {children}
            </div>
        </>
    )
} 