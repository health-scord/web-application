mkdir -p src/components/pages/$1
sed -e "s/GenComponent/$1/g" bash/gen_page_component/GenComponent.tsx > src/components/pages/$1/$1.tsx
sed -e "s/GenComponent/$1/g" bash/gen_page_component/GenComponent.scss > src/components/pages/$1/$1.scss
sed -e "s/GenComponent/$1/g" bash/gen_page_component/GenComponent.d.ts > src/components/pages/$1/$1.d.ts
