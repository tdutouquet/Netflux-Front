<template>
    <footer class="bg-dark text-white mt-5 py-4">
        <div class="container">
            <div class="row">
                <div class="col offset-md-2">
                    <h3 style="color: var(--clr-primary)">
                        <i class="bi bi-camera-video-fill"></i>
                        {{ siteName }}
                    </h3>
                </div>
                <div class="col footer-links">
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none text-light">À propos</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Services</a></li>
                        <li><a href="#" class="text-decoration-none text-light">CGV</a></li>
                    </ul>
                </div>

                <div class="col footer-links">
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none text-light">Contact</a></li>
                        <li><a href="#" class="text-decoration-none text-light">Blog</a></li>
                        <li><a href="#" class="text-decoration-none text-light">FAQ</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['siteName'])
    }
}
</script>