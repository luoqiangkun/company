'use client';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { motion, AnimatePresence } from 'framer-motion';

type ResultItem = {
    title: string;
    content: string;
    locale: string;
};

type ResultGroup = {
    category: string;
    list: ResultItem[];
};

type Props = {
    open: boolean;
    close: () => void;
};

const DesktopSearch = ({ open, close }: Props) => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<ResultGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 实际发起搜索请求
    const fetchResults = useCallback(async (kw: string) => {
        if (!kw.trim()) {
            setResults([]);
            setError('');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(
                `/api/search?keyword=${encodeURIComponent(kw)}&locale=zh-Hans`
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setResults(data);
        } catch (err: any) {
            console.error(err);
            setError('Search failed. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // 防抖包裹 fetchResults
    const debouncedFetch = useCallback(debounce(fetchResults, 200), [
        fetchResults,
    ]);

    // 监听关键词变化触发搜索
    useEffect(() => {
        debouncedFetch(keyword);
        return () => {
            debouncedFetch.cancel();
        };
    }, [keyword, debouncedFetch]);

    function closeSearch() {
        setKeyword('');
        close();
    }
    return (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 px-4 bg-white text-base"
                >
                    <div
                        className="absolute z-0 inset-0"
                        onClick={closeSearch}
                    />

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full z-1"
                    >
                        <div className="relative">
                            <svg
                                className="size-6 mx-2 absolute top-1/2 -translate-y-1/2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={keyword}
                                placeholder="请输入关键字"
                                className="w-full text-sm px-12 py-4 border-b-1 border-b-neutral-200 focus:outline-none focus:none"
                                autoFocus
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                            />
                        </div>

                        <motion.div className='mt-4'>
                            <AnimatePresence>
                                {loading && (
                                    <p className="text-gray-500 text-center">
                                        Searching...
                                    </p>
                                )}

                                {error && (
                                    <p className="text-red-500 text-center">
                                        {error}
                                    </p>
                                )}
                                {!loading &&
                                    !error &&
                                    keyword.trim() &&
                                    results.length === 0 && (
                                        <p className="text-gray-500 text-center">
                                            No results found.
                                        </p>
                                    )}

                                {results.map((group) => (
                                    <motion.div
                                        className='mb-4'
                                        key={group.category}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-2 font-medium text-gray-500">
                                            {group.category}
                                        </div>
                                        {group.list.map((item, idx) => (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                transition={{
                                                    duration: 0.1,
                                                    delay: 0 * 0.05,
                                                }}
                                                className="py-2 px-2 cursor-pointer transition-colors hover:bg-gray-100"
                                            >
                                                <h3
                                                    className="text-md text-gray-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                    }}
                                                />
                                                <p
                                                    className="text-sm text-gray-600 mt-1"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.content,
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DesktopSearch;
