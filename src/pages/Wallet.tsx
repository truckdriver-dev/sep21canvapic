import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Settings,
  Activity,
  Eye,
  Copy,
  TrendingUp,
  DollarSign,
  BarChart3,
  Shield,
  Bell,
  Palette,
  Network
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SolanaWallet, WalletData } from '../utils/solanaWallet';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change: number;
  logo: string;
}

export const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'earn' | 'explore' | 'activity' | 'settings'>('home');
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState<'all' | 'sent' | 'received' | 'staked'>('all');

  const solanaWallet = new SolanaWallet();

  // Auto-create wallet for every user
  useEffect(() => {
    const storedWallet = localStorage.getItem('wegram_wallet');
    if (storedWallet) {
      try {
        const wallet = JSON.parse(storedWallet);
        setWalletData(wallet);
      } catch (error) {
        console.error('Failed to load stored wallet:', error);
        createNewWallet();
      }
    } else {
      createNewWallet();
    }
  }, []);

  const createNewWallet = () => {
    const wallet = solanaWallet.generateWallet();
    setWalletData(wallet);
    localStorage.setItem('wegram_wallet', JSON.stringify(wallet));
  };

  // Mock data
  const totalBalance = 24567.89;
  const todayEarnings = 89.45;
  const todayChange = 1234.56;
  const todayChangePercent = 5.3;

  const tokens: Token[] = [
    {
      symbol: 'WEGRAM',
      name: 'Wegram Token',
      balance: 1250000,
      usdValue: 18234.56,
      change: 12.8,
      logo: 'https://i.ibb.co/Fk1VMcs4/IMG-9782.jpg'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.1543,
      usdValue: 4567.89,
      change: 1.8,
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 45.67,
      usdValue: 1765.44,
      change: -0.5,
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png'
    }
  ];

  const activities = [
    {
      type: 'received',
      title: 'Received $WEGRAM',
      from: '0x742d...8f3a',
      amount: '50,000 $WEGRAM',
      value: '$730.50',
      time: '2 hours ago'
    },
    {
      type: 'staked',
      title: 'Staked $WEGRAM',
      from: 'Premium Pool • 18.5% APY',
      amount: '100,000 $WEGRAM',
      value: '$1,461.00',
      time: '1 day ago'
    },
    {
      type: 'sent',
      title: 'Sent ETH',
      from: 'To: 0x9a2b...4c5d',
      amount: '-0.25 ETH',
      value: '$530.75',
      time: '3 days ago'
    },
    {
      type: 'received',
      title: 'Received SOL',
      from: 'From: 7x8y...9z0a',
      amount: '+15.5 SOL',
      value: '$598.45',
      time: '1 week ago'
    }
  ];

  const copyAddress = () => {
    if (walletData) {
      navigator.clipboard.writeText(walletData.publicKey);
      // Show feedback
      alert('Address copied to clipboard!');
    }
  };

  const switchTab = (tab: 'home' | 'earn' | 'explore' | 'activity' | 'settings') => {
    setActiveTab(tab);
  };

  const filterActivity = (type: 'all' | 'sent' | 'received' | 'staked') => {
    setActivityFilter(type);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'received':
        return <ArrowDown className="w-5 h-5" />;
      case 'sent':
        return <ArrowUp className="w-5 h-5" />;
      case 'staked':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'received':
        return 'bg-green-500';
      case 'sent':
        return 'bg-red-500';
      case 'staked':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getChangeText = (change: number) => {
    return change >= 0 ? `+${change}%` : `${change}%`;
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}>
      <div className="max-w-md mx-auto relative min-h-screen">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 pt-16 pb-24">
          {/* Header */}
          <div className="rounded-b-3xl p-6 mb-6 shadow-2xl mx-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <img 
                    src="https://i.ibb.co/Fk1VMcs4/IMG-9782.jpg" 
                    alt="WEGRAM" 
                    className="w-full h-full object-cover rounded-full" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="text-lg font-bold hidden">WW</span>
                </div>
                <div>
                  <h2 className="font-semibold">WegWallet</h2>
                  <p className="text-sm text-gray-300">Premium Crypto Wallet</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => switchTab('activity')} 
                  className="p-2 rounded-lg bg-white/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => switchTab('settings')} 
                  className="p-2 rounded-lg bg-white/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowVaultModal(true)} 
                  className="p-2 rounded-lg bg-white/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-400">Wallet Address:</span>
              <span className="text-sm font-mono">0x742d...8f3a</span>
              <button 
                onClick={copyAddress} 
                className="p-1 hover:text-blue-400 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            {/* Balance Display */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}>
                ${totalBalance.toLocaleString()}
              </h1>
              <p className="text-green-400 text-sm">
                +${todayChange.toLocaleString()} ({todayChangePercent}%) today
              </p>
            </div>
            
            {/* Earnings Highlight */}
            <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Today's Earnings</p>
                  <p className="text-xl font-bold text-green-400">+${todayEarnings}</p>
                </div>
                <div className="text-green-400">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-5 gap-3">
              <button 
                onClick={() => setShowSendModal(true)}
                className="rounded-2xl p-3 text-center transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                <ArrowUp className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Send</span>
              </button>
              <button 
                onClick={() => setShowReceiveModal(true)}
                className="rounded-2xl p-3 text-center transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                <ArrowDown className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Receive</span>
              </button>
              <button 
                onClick={() => setShowBuyModal(true)}
                className="rounded-2xl p-3 text-center transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                <DollarSign className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Buy</span>
              </button>
              <button 
                onClick={() => setShowSwapModal(true)}
                className="rounded-2xl p-3 text-center transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                <RefreshCw className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Swap</span>
              </button>
              <button 
                onClick={() => switchTab('earn')}
                className="rounded-2xl p-3 text-center transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Earn</span>
              </button>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => switchTab('home')} 
                className={`px-6 py-2 rounded-2xl transition-all ${
                  activeTab === 'home' 
                    ? 'text-white' 
                    : 'text-white hover:bg-white/20'
                }`}
                style={activeTab === 'home' 
                  ? { background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }
                  : { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)' }
                }
              >
                <span className="text-sm font-medium">Home</span>
              </button>
              <button 
                onClick={() => switchTab('earn')} 
                className={`px-6 py-2 rounded-2xl transition-all ${
                  activeTab === 'earn' 
                    ? 'text-white' 
                    : 'text-white hover:bg-white/20'
                }`}
                style={activeTab === 'earn' 
                  ? { background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }
                  : { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)' }
                }
              >
                <span className="text-sm font-medium">Earn</span>
              </button>
              <button 
                onClick={() => switchTab('explore')} 
                className={`px-6 py-2 rounded-2xl transition-all ${
                  activeTab === 'explore' 
                    ? 'text-white' 
                    : 'text-white hover:bg-white/20'
                }`}
                style={activeTab === 'explore' 
                  ? { background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }
                  : { background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)' }
                }
              >
                <span className="text-sm font-medium">Explore</span>
              </button>
            </div>
            
            {/* Wallet Settings Button */}
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => navigate('/wallet/settings')}
                className="px-6 py-2 rounded-2xl transition-all text-white hover:bg-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              >
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Wallet Settings</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="px-4 pb-8">
            {/* Home Content */}
            {activeTab === 'home' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Assets</h3>
                <div className="space-y-4">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                            <img 
                              src={token.logo} 
                              alt={token.symbol} 
                              className="w-full h-full object-cover rounded-full" 
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <span className="text-sm font-bold hidden">{token.symbol[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{token.symbol}</h4>
                            <p className="text-sm text-gray-400">{token.balance.toLocaleString()} {token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${token.usdValue.toLocaleString()}</p>
                          <p className={`text-sm ${getChangeColor(token.change)}`}>
                            {getChangeText(token.change)}
                          </p>
                          <svg className="sparkline ml-auto mt-1" viewBox="0 0 60 20">
                            <polyline 
                              fill="none" 
                              stroke={token.change >= 0 ? "#10b981" : "#ef4444"} 
                              strokeWidth="2" 
                              points="0,15 10,12 20,8 30,10 40,6 50,4 60,2"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Earn Content */}
            {activeTab === 'earn' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Earn Rewards</h3>
                <div className="space-y-4">
                  <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <img 
                        src="https://i.ibb.co/Fk1VMcs4/IMG-9782.jpg" 
                        alt="WEGRAM" 
                        className="w-6 h-6 rounded-full mr-2" 
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                      $WEGRAM Staking Pools
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">WEGRAM Premium Pool</span>
                          <span className="text-green-400 font-bold">18.5% APY</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Min: 10,000 $WEGRAM</span>
                          <span>Lock: 30 days</span>
                        </div>
                        <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2 text-sm font-medium hover:scale-105 transition-transform">
                          Stake Now
                        </button>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">WEGRAM Flexible Pool</span>
                          <span className="text-green-400 font-bold">12.3% APY</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Min: 1,000 $WEGRAM</span>
                          <span>Lock: Flexible</span>
                        </div>
                        <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-2 text-sm font-medium hover:scale-105 transition-transform">
                          Stake Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-2">Other Pools</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>ETH 2.0 Staking</span>
                        <span className="text-green-400">4.5% APY</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SOL Staking</span>
                        <span className="text-green-400">6.2% APY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Explore Content */}
            {activeTab === 'explore' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Explore</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-semibold">NFTs</h4>
                  </div>
                  <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <div className="mb-2">
                      <div className="w-8 h-8 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">$</span>
                      </div>
                    </div>
                    <h4 className="font-semibold">Lottery</h4>
                  </div>
                </div>
              </div>
            )}
            
            {/* Activity Content */}
            {activeTab === 'activity' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <button className="text-sm text-blue-400 hover:text-blue-300">Export</button>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex space-x-2 mb-4">
                  <button 
                    onClick={() => filterActivity('all')} 
                    className={`px-4 py-2 rounded-xl text-sm ${
                      activityFilter === 'all' ? 'bg-blue-600' : 'bg-white/10'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => filterActivity('sent')} 
                    className={`px-4 py-2 rounded-xl text-sm ${
                      activityFilter === 'sent' ? 'bg-blue-600' : 'bg-white/10'
                    }`}
                  >
                    Sent
                  </button>
                  <button 
                    onClick={() => filterActivity('received')} 
                    className={`px-4 py-2 rounded-xl text-sm ${
                      activityFilter === 'received' ? 'bg-blue-600' : 'bg-white/10'
                    }`}
                  >
                    Received
                  </button>
                  <button 
                    onClick={() => filterActivity('staked')} 
                    className={`px-4 py-2 rounded-xl text-sm ${
                      activityFilter === 'staked' ? 'bg-blue-600' : 'bg-white/10'
                    }`}
                  >
                    Staked
                  </button>
                </div>
                
                <div className="space-y-3">
                  {activities
                    .filter(activity => activityFilter === 'all' || activity.type === activityFilter)
                    .map((activity, index) => (
                    <div key={index} className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${getActivityColor(activity.type)} rounded-full flex items-center justify-center`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-gray-400">{activity.from}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            activity.type === 'received' || activity.type === 'staked' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {activity.amount}
                          </p>
                          <p className="text-xs text-gray-400">{activity.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Settings Content */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Wallet Settings</h3>
                <div className="space-y-4">
                  {/* Security Section */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Biometric Lock</span>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-Lock (5 min)</span>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <button className="w-full p-3 bg-white/10 rounded-lg text-left">
                        Change Passcode
                      </button>
                      <button className="w-full p-3 bg-white/10 rounded-lg text-left">
                        View Recovery Phrase
                      </button>
                    </div>
                  </div>
                  
                  {/* Notifications */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Transaction Alerts</span>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Price Alerts</span>
                        <button className="w-12 h-6 bg-gray-400 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Staking Rewards</span>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Customization */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Appearance
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Ocean Blue</button>
                      <button className="w-full p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">Cosmic Purple</button>
                      <button className="w-full p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">Matrix Green</button>
                    </div>
                  </div>
                  
                  {/* Network Settings */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Network className="w-5 h-5 mr-2" />
                      Network
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Network</span>
                        <span className="text-sm text-green-400">Ethereum Mainnet</span>
                      </div>
                      <button className="w-full p-3 bg-white/10 rounded-lg text-left">
                        Switch Network
                      </button>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-Switch for DApps</span>
                        <button className="w-12 h-6 bg-green-500 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* About */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
                    <h4 className="font-semibold mb-3">About WegWallet</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>Version: 2.1.0</p>
                      <p>Premium Crypto Wallet</p>
                      <p>Powered by WEGRAM Network</p>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button className="flex-1 p-2 bg-white/10 rounded-lg text-sm">Support</button>
                      <button className="flex-1 p-2 bg-white/10 rounded-lg text-sm">Terms</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Modals */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="rounded-3xl p-6 w-full max-w-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <h3 className="text-xl font-bold mb-4">Send Crypto</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Recipient Address" 
                  className="w-full p-3 bg-white/10 rounded-2xl border border-white/20 text-white placeholder-gray-400"
                />
                <input 
                  type="number" 
                  placeholder="Amount" 
                  className="w-full p-3 bg-white/10 rounded-2xl border border-white/20 text-white placeholder-gray-400"
                />
                <button className="w-full rounded-2xl p-3 font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}>
                  Swipe to Send →
                </button>
              </div>
              <button 
                onClick={() => setShowSendModal(false)} 
                className="mt-4 text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {showReceiveModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="rounded-3xl p-6 w-full max-w-sm text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <h3 className="text-xl font-bold mb-4">Receive WEGRAM</h3>
              <div className="bg-white p-4 rounded-2xl mb-4">
                <div className="w-32 h-32 mx-auto bg-black rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs">QR CODE</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">Scan QR code or copy address below</p>
              <div className="bg-white/10 rounded-2xl p-3 mb-4">
                <p className="text-xs font-mono break-all">0x742d35Cc6C4C0532E3a0C8A0Ef4B1b4C8f3a</p>
              </div>
              <button 
                onClick={() => setShowReceiveModal(false)} 
                className="w-full rounded-2xl p-3 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {showBuyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="rounded-3xl p-6 w-full max-w-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <h3 className="text-xl font-bold mb-4">Buy WEGRAM</h3>
              <div className="space-y-4">
                <select className="w-full p-3 bg-white/10 rounded-2xl border border-white/20 text-white">
                  <option>Pay with USD</option>
                  <option>Pay with EUR</option>
                  <option>Pay with BTC</option>
                </select>
                <input 
                  type="number" 
                  placeholder="Amount to spend" 
                  className="w-full p-3 bg-white/10 rounded-2xl border border-white/20 text-white placeholder-gray-400"
                />
                <div className="bg-white/10 rounded-2xl p-3">
                  <p className="text-sm">You will receive: <span className="text-green-400 font-bold">~2,500 $WEGRAM</span></p>
                </div>
                <button className="w-full rounded-2xl p-3 font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}>
                  Buy WEGRAM
                </button>
              </div>
              <button 
                onClick={() => setShowBuyModal(false)} 
                className="mt-4 text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {showSwapModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="rounded-3xl p-6 w-full max-w-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <h3 className="text-xl font-bold mb-4">Swap Tokens</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <label className="text-sm text-gray-300">From</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      className="flex-1 bg-transparent text-xl font-bold text-white placeholder-gray-400"
                    />
                    <select className="bg-white/20 rounded-lg p-2 text-white">
                      <option>ETH</option>
                      <option>WEGRAM</option>
                      <option>SOL</option>
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <button className="p-2 bg-white/20 rounded-full">⇅</button>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <label className="text-sm text-gray-300">To</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      className="flex-1 bg-transparent text-xl font-bold text-white placeholder-gray-400"
                    />
                    <select className="bg-white/20 rounded-lg p-2 text-white">
                      <option>WEGRAM</option>
                      <option>ETH</option>
                      <option>SOL</option>
                    </select>
                  </div>
                </div>
                <button className="w-full rounded-2xl p-3 font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)' }}>
                  Swap Tokens
                </button>
              </div>
              <button 
                onClick={() => setShowSwapModal(false)} 
                className="mt-4 text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {showVaultModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="vault-mode rounded-3xl p-6 w-full max-w-sm text-center">
              <h3 className="text-xl font-bold mb-4">🔒 Vault Mode</h3>
              <p className="text-sm mb-6">Enter your passcode to access hidden assets</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key) => (
                  <button 
                    key={key}
                    className="aspect-square bg-white/20 rounded-2xl text-xl font-bold hover:bg-white/30 transition-colors"
                  >
                    {key}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowVaultModal(false)} 
                className="text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};