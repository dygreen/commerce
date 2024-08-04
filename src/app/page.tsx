'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
    const [products, setProducts] = useState<
        { id: string; properties: { id: string }[] }[]
    >([])
    const inputRef = useRef<HTMLInputElement>(null)

    const fetchGetItems = async () => {
        try {
            const response = await fetch('/api/get-items')
            const data = await response.json()
            setProducts(data.item)
        } catch (e) {
            console.error(e)
        }
    }

    const fetchAddItems = async () => {
        try {
            const response = await fetch(
                `/api/add-item?name=${inputRef?.current?.value}`,
            )
            const data = await response.json()
            alert(data.message)
        } catch (e) {
            console.error(e)
        }
    }

    const handleClick = () => {
        if (inputRef.current == null || inputRef.current.value === '') {
            alert('name 을 넣어주세요.')
            return
        }
        fetchAddItems()
    }

    const fetchGetDetail = async (pageId: string, propertyId: string) => {
        try {
            const response = await fetch(
                `/api/get-detail?pageId=${pageId}&propertyId=${propertyId}`,
            )
            const data = await response.json()
            alert(JSON.stringify(data.detail))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchGetItems()
    }, [])

    return (
        <main>
            <div>
                <input ref={inputRef} type="text" placeholder="name" />
                <button onClick={handleClick}>Add Jacket</button>
            </div>
            <div>
                <p>Product List</p>
                {products &&
                    products.map((item) => (
                        <div key={item.id}>
                            {JSON.stringify(item)}
                            {item.properties &&
                                Object.entries(item.properties).map(
                                    ([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() =>
                                                fetchGetDetail(
                                                    item.id,
                                                    value.id,
                                                )
                                            }
                                        >
                                            {key}
                                        </button>
                                    ),
                                )}
                            <br />
                            <br />
                        </div>
                    ))}
            </div>
        </main>
    )
}
