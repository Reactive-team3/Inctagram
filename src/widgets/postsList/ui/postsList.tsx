'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './postsList.module.scss'
import { PostCard } from '@/widgets/postsList/ui/postCard'
import { Post } from '@/widgets/postsList/model/types/posts'

export const PostsList = () => {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      userId: 'user1',
      userProfile: {
        avatar: '/user-images/image.png',
        name: 'John Doe',
      },
      content: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed jhkjhkjhkhj hkjhkhkhkjh jhghjgjhgjhg jgjhgjhgjhgjhg jkhgjhgjhg ьопоирорпор орпорпорпорпорпб орпорпорпор',
        images: [{ url: '/user-images/image.png' }, { url: '/user-images/image.png' }],
      },
      timestamp: '22 min ago',
      slides: [
        { id: '1-0', content: <Image src="/user-images/image.png" alt="Slide 1" fill /> },
        { id: '1-1', content: <Image src="/user-images/image.png" alt="Slide 2" fill /> },
      ],
    },
    {
      id: '2',
      userId: 'user2',
      userProfile: {
        avatar: '/user-images/image.png',
        name: 'Jane Smith',
      },
      content: {
        text: 'Another post content here with different jhgjhgjhgjhgjgjh kjhkjhkj jkjhkjhj jgjhgjgjg ghgfhgfhfhg hbjhgjhgjhg  text...',
        images: [{ url: '/user-images/image.png' }],
      },
      timestamp: '1 hour ago',
      slides: [
        { id: '2-0', content: <Image src="/user-images/image.png" alt="Slide 1" fill /> },
        { id: '2-1', content: <Image src="/user-images/image.png" alt="Slide 2" fill /> },
      ],
    },
    {
      id: '3',
      userId: 'user3',
      userProfile: {
        avatar: '/user-images/image.png',
        name: 'Jane Smith',
      },
      content: {
        text: 'Another post content here with different jhgjhgjhgjhgjgjh kjhkjhkj    text...',
        images: [{ url: '/user-images/image.png' }],
      },
      timestamp: '1 hour ago',
      slides: [
        { id: '3-0', content: <Image src="/user-images/image.png" alt="Slide 1" fill /> },
        { id: '3-1', content: <Image src="/user-images/image.png" alt="Slide 2" fill /> },
      ],
    },
    {
      id: '4',
      userId: 'user4',
      userProfile: {
        avatar: '/user-images/image.png',
        name: 'Jane Smith',
      },
      content: {
        text: 'Another post content here with different jhgjhgjhgjhgjgjh kjhkjhkj jkjhkjhj jgjhgjgjg ghgfhgfhfhg gjhgjhgjgj jhgjhgjhghj  text...',
        images: [{ url: '/user-images/image.png' }],
      },
      timestamp: '1 hour ago',
      slides: [
        { id: '4-0', content: <Image src="/user-images/image.png" alt="Slide 1" fill /> },
        { id: '4-1', content: <Image src="/user-images/image.png" alt="Slide 2" fill /> },
      ],
    },
  ])

  const [slideIndexes, setSlideIndexes] = useState<Record<string, number>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: 0 }), {})
  )

  const updateSlideIndex = (postId: string, newIndex: number) => {
    setSlideIndexes(prev => ({
      ...prev,
      [postId]: newIndex,
    }))
  }

  return (
    <div className={styles.cardsContainer}>
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          currentIndex={slideIndexes[post.id]}
          onIndexChangeAction={newIndex => updateSlideIndex(post.id, newIndex)}
        />
      ))}
    </div>
  )
}
