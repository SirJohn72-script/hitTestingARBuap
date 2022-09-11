import React from 'react'
import { ARExperience } from './Script'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function AREscene() {
  const { model } = useParams()

  useEffect(() => {
    const experience = new ARExperience()
    experience.initScene()

    if (model === 'Lobito') {
      experience.loadModelWithAnimation(`/models/${model}2.glb`)
    } else {
      experience.loadModel(`/models/${model}.glb`)
    }

    return () => {
      experience.cleapUp()
    }
  }, [])

  return (
    <>
      <div className="loader"></div>
      <div id="Scene3D" style={{ width: '100%', height: '100vh' }}></div>
    </>
  )
}
