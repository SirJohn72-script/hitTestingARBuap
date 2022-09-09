import React from 'react'
import { ARExperience } from './Script'
import { useEffect } from 'react'

export default function AREscene() {
  useEffect(() => {
    const experience = new ARExperience()
    experience.initScene()
    // experience.SetupXRExperience()

    return () => {
      experience.cleapUp()
    }
  }, [])

  return <div id="Scene3D" style={{ width: '100%', height: '100vh' }}></div>
}
