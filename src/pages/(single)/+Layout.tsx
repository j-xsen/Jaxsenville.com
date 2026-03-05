import {usePageContext} from "vike-react/usePageContext";
import React from 'react'
import PageTitleButton from '../../components/PageTitleButton'

import {useData} from "vike-react/useData"
import type {Data} from './+data'

export {Layout}

function Layout({children}: { children: React.ReactNode }) {
    const data = useData<Data>()
    const pageContext = usePageContext()
    return (
        <>
            <nav role={"navigation"}>
                <ul style={{
                    position: "relative",
                    zIndex: 20,
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    margin: "0",
                    justifyContent: "space-between",
                }}>
                    <PageTitleButton text={data.path}/>
                    {pageContext.urlParsed.pathname === "/art" && (
                        <li className="instagram-link-container"
                            onMouseDown={() => window.open("https://www.instagram.com/j_xsen/", "_blank")}>
                            <a href="https://www.instagram.com/j_xsen/" target="_blank" className="instagram-link">
                                <img src="/icon/instagram.svg" className="icon" alt="Instagram logo"/>
                                @j_xsen
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="Gallery" tabIndex={-1}>
                {children}
            </div>
        </>
    )
}
