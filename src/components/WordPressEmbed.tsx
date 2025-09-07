'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ExternalLink, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface WordPressEmbedProps {
    url: string
}

interface EmbedData {
    title: string
    thumbnail_url: string
}

export default function WordPressEmbedClient({ url }: WordPressEmbedProps) {
    const [data, setData] = useState<EmbedData | null>(null)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchEmbed = async () => {
            try {
                const apiUrl = `https://techmath-project.com/wp-json/oembed/1.0/embed?url=${encodeURIComponent(
                    url
                )}`
                const res = await fetch(apiUrl)
                if (!res.ok) {
                    throw new Error('Failed to fetch')
                }
                const embedData: EmbedData = await res.json()
                setData(embedData)
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEmbed()
    }, [url])

    if (error) {
        return (
            <div className='max-w-md mx-auto my-5'>
                <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>パズル記事を読み込めませんでした</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (isLoading) {
        return (
            <Card className='max-w-md mx-auto my-5'>
                <CardContent className='p-4'>
                    <div className='space-y-3'>
                        <Skeleton className='h-48 w-full rounded-lg' />
                        <div className='flex items-center space-x-2'>
                            <Skeleton className='h-4 w-4' />
                            <Skeleton className='h-4 flex-1' />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!data || !data.thumbnail_url) {
        return null
    }

    return (
        <Card className='max-w-md mx-auto my-5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]'>
            <CardContent className='p-0'>
                <a href={url} target='_blank' rel='noopener noreferrer' className='block group'>
                    <div className='relative overflow-hidden'>
                        <Image
                            src={data.thumbnail_url || '/placeholder.svg'}
                            alt={data.title}
                            width={400}
                            height={200}
                            className='w-full h-auto transition-transform duration-300 group-hover:scale-105'
                            priority={false}
                        />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300' />
                        <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className='bg-white/90 backdrop-blur-sm rounded-full p-2'>
                                <ExternalLink className='h-4 w-4 text-gray-700' />
                            </div>
                        </div>
                    </div>
                    {data.title && (
                        <div className='p-4'>
                            <h3 className='text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
                                {data.title}
                            </h3>
                        </div>
                    )}
                </a>
            </CardContent>
        </Card>
    )
}
