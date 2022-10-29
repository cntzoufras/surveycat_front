set -x
cd /surveycat
yarn install --frozen-lockfile
exec yarn start --host=0.0.0.0