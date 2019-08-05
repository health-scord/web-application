mkdir -p src/components/layout/$1
sed -e "s/GenComponent/$1/g" bash/gen_layout_component/GenComponent.tsx > src/components/layout/$1/$1.tsx
sed -e "s/GenComponent/$1/g" bash/gen_layout_component/GenComponent.scss > src/components/layout/$1/$1.scss
sed -e "s/GenComponent/$1/g" bash/gen_layout_component/GenComponent.d.ts > src/components/layout/$1/$1.d.ts
