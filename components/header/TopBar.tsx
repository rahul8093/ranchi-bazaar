const TopBar = () => {
    return (
        <div className="bg-[#3b487f] text-white text-sm py-2 px-4 flex justify-between items-center">
            <span>Welcome to Ranchi Bazaar</span>
            <div className="flex gap-4 items-center text-sm text-white">
                <span>📍 Deliver to <strong>835303</strong></span>
                <span>🚚 Track your order</span>
                <span>⚙️ All Offers</span>
            </div>
        </div>
    );
};

export default TopBar;
