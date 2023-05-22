echo "start build..."
npm run build
echo "finish build..."
echo "start copying..."
scp -i ~/Downloads/horizon.pem -r dist/* ubuntu@3.34.2.208:/var/www/3.34.2.208/
echo "done!"