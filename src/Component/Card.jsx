import React from 'react'
import { CodeMirrorEditor } from './CodeMirrorEditor'

export const Card = ({title,code}) => {
  return (
    <>
    <div className="w-[70vw] bg-white rounded-2xl overflow-hidden">
            <div className="text-2xl capitalize text-center py-3">
                <h2>{title}</h2>
            </div>
            <div>
                <CodeMirrorEditor value={code}  height="100px"/>
            </div>
    </div>
    </>
  )
}
