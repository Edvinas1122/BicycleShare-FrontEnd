mv package.json package.vercel.json
mv package.local.json package.json
npm "$@"
mv package.json package.local.json
mv package.vercel.json package.json