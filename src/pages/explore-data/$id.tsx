import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explore-data/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/explore-data/$id"!</div>
}
