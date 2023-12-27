import React, { useEffect, useState } from 'react'
import apiInstance from '../../../api/apiInstance'

const Profile = () => {
  const [avatar, setAvatar] = useState('')
  const [profile, setProfile] = useState({})
  useEffect(() => {
    fetchProfile()
  }, [])
  const fetchProfile = async () => {
    try {
      const response = await apiInstance.get('/user/profile')
      const data = response.data
      if (response.status == 200) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }
  return (
    <div id='info-profile-container'>
      <div id='info-user-container'>
        <div id='info-user-image'>
          <img src={profile.image} alt='user image' />
        </div>
        <div id='info-user-detail'>
          <div>
            <h1>{profile.fname}</h1>
          </div>
          <div id='follow-container'>
            <div>
              <h3>Follower {profile.follower}</h3>
            </div>
            <div>
              <h3>Following {profile.following}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
