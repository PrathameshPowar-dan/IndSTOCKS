'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "@/components/SearchCommand";

const NAV_ITEMS = [
    { href: '/', label: 'Dashboard' },
    { href: '/search', label: 'Search' },
    { href: '/watchlist', label: 'Watchlist' },
];

const NavItems = ({ initialStocks }: { initialStocks: StockWithWatchlistStatus[] }) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <div className="flex items-center gap-2 p-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
            {NAV_ITEMS.map(({ href, label }) => {

                if (href === '/search') return (
                    <div key="search-trigger">
                        <SearchCommand
                            renderAs="text"
                            label="Search"
                            initialStocks={initialStocks}
                        />
                    </div>
                )
                return <Link
                    key={href}
                    href={href}
                    className={`
                        relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                        ${isActive(href)
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }
                    `}
                >
                    <span>{label}</span>
                </Link>

            })}
        </div>
    )
}
export default NavItems