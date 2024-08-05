'use client'

import { useEffect, useRef, useState } from 'react'
import { css } from '@node_modules/@emotion/react'

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
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="name"
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
                <button
                    css={css`
                        background-color: hotpink;
                        padding: 16px;
                        border-radius: 8px;
                    `}
                    onClick={handleClick}
                >
                    Add Jacket
                </button>
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
