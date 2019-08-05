mkdir -p src/components/data/$1
sed -e "s/GenComponent/$1/g" bash/gen_data_component/GenComponent.tsx > src/components/data/$1/$1.tsx
sed -e "s/GenComponent/$1/g" bash/gen_data_component/GenComponent.scss > src/components/data/$1/$1.scss
sed -e "s/GenComponent/$1/g" bash/gen_data_component/GenComponent.d.ts > src/components/data/$1/$1.d.ts
