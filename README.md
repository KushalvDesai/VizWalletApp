# VizCoin - Secure Token with Guardian Functionality

VizCoin is a secure ERC20 token built on the Sepolia testnet with advanced guardian functionality for controlled transactions. The project features a modern web interface with dark mode support and seamless wallet integration, available as a web application.

## Features

- 🔒 **Guardian Protection**: Secure transaction system with guardian oversight
- 💰 **Token Management**: Full ERC20 token functionality
- 👥 **Allowance System**: Controlled spending with customizable allowances
- 🔗 **Wallet Integration**: Seamless MetaMask and WalletConnect integration
- 📱 **Responsive Design**: Mobile-friendly interface
- ⚡ **Fast Transactions**: Quick and efficient token transfers

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **Blockchain**: Thirdweb SDK
- **Network**: Sepolia Testnet
- **Token**: ERC20 Standard

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH for gas fees

## Installation

### Web Application

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vizcoin.git
cd vizcoin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Thirdweb client ID:
```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract

The VizCoin token contract is deployed on the Sepolia testnet:
```
Address: 0x8E3784E3ec0b4C03d4B9CA6df1800c6D5aDedF9c
```

### Key Functions

- `balanceOf(address)`: Check token balance
- `allowance(address,address)`: Check spending allowance
- `transfer(address,uint256)`: Transfer tokens
- `setAllowance(address,uint256)`: Set spending allowance
- `denySending(address)`: Deny sending permissions
- `proposeNewOwner(address)`: Propose new contract owner

## Usage

### Web Application

1. **Connect Wallet**
   - Click the "Connect Wallet" button
   - Choose your preferred wallet (MetaMask recommended)
   - Ensure you're connected to Sepolia testnet

2. **View Balance**
   - Your VizCoin balance will be displayed in the account modal
   - Current allowance and sending permissions are shown

3. **Manage Tokens**
   - Transfer tokens to other addresses
   - Set allowances for controlled spending
   - Manage guardian permissions

4. **Theme Toggle**
   - Use the sun/moon icon in the navbar to switch between light and dark modes
   - Theme preference is saved in localStorage

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── providers.tsx    # Thirdweb and theme providers
│   └── page.tsx         # Main page component
├── components/          # React components
│   ├── Navbar.tsx       # Navigation bar
│   ├── AccountModal.tsx # Account management modal
├── context/            # React context
    └── ThemeContext.tsx # Dark mode context
```

### Adding New Features

1. Create new components in the `components` directory
2. Add new contract interactions in `AccountModal.tsx`
3. Update the UI in `page.tsx` and `Navbar.tsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Thirdweb](https://thirdweb.com/) for the Web3 SDK
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
- [Next.js](https://nextjs.org/) for the React framework
- [Sepolia Testnet](https://sepolia.dev/) for the test environment
