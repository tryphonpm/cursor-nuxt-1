<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.id}`);

// Validation
if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Article non trouvé',
  });
}
</script>

<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </div>
</template>
