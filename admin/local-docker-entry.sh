set -x
cd /easydev
yarn install --frozen-lockfile
exec yarn start --host=0.0.0.0