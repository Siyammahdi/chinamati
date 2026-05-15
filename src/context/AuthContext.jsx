import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (!error) {
        setProfile(data)
      } else {
        console.error('Error fetching profile:', error)
        setProfile({
          id: userId,
          role: 'customer',
          full_name: null
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setProfile({
        id: userId,
        role: 'customer',
        full_name: null
      })
    }
  }

  // Sign up
  const signUp = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      })
      return { data, error }
    } catch (err) {
      console.error('Error signing up:', err)
      return { data: null, error: err }
    }
  }

  // Sign in
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (err) {
      console.error('Error signing in:', err)
      return { data: null, error: err }
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      return { error }
    } catch (err) {
      console.error('Error signing out:', err)
      setUser(null)
      setProfile(null)
      return { error: err }
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) return { error: 'Not authenticated' }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (!error && data) {
        setProfile(data)
        return { data, error: null }
      }
      return { data: null, error }
    } catch (err) {
      console.error('Error updating profile:', err)
      return { data: null, error: err }
    }
  }

  useEffect(() => {
    let authSubscription = null

    const initAuth = async () => {
      try {
        setLoading(true)

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }

        // Listen for auth changes
        authSubscription = supabase.auth.onAuthStateChange(async (_event, session) => {
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setProfile(null)
          }
          
          setLoading(false)
        })
      } catch (err) {
        console.error('Error initializing auth:', err)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    return () => {
      if (authSubscription) {
        authSubscription.data.subscription.unsubscribe()
      }
    }
  }, [])

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
