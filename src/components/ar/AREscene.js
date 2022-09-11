import React from 'react'
import { ARExperience } from './Script'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function AREscene({ modelPath }) {
  const { model } = useParams()

  // useEffect(() => {
  //   console.log(model)
  // }, [])

  useEffect(() => {
    const experience = new ARExperience()
    experience.initScene()
    experience.loadModel(`/models/${model}.glb`)

    return () => {
      experience.cleapUp()
    }
  }, [])

  return <div id="Scene3D" style={{ width: '100%', height: '100vh' }}></div>
}
