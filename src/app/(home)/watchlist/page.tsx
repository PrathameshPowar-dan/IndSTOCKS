import { Star } from 'lucide-react';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import SearchCommand from '@/components/SearchCommand';
import Header from '@/components/Header';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Watchlist = async () => {
    const watchlist = [];
    const initialStocks = await searchStocks();

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        redirect('/sign-IN')
    }

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }

    if (watchlist.length === 0) {
        return (
            <section className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Header user={user} />
                <div className="watchlist-empty mt-20">
                    <Star className="watchlist-star" />
                    <h2 className="empty-title">Your watchlist is empty</h2>
                    <p className="empty-description">
                        Start adding stocks to your watchlist to see them here.
                    </p>
                <SearchCommand initialStocks={initialStocks} />
                </div>
            </section>
        );
    }

    return (
        <section className="watchlist">
            <Header user={user} />
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="watchlist-title">Watchlist</h2>
                    <SearchCommand initialStocks={initialStocks} />
                </div>
                {/* WatchlistTable */}
            </div>
        </section>
    );
};

export default Watchlist;