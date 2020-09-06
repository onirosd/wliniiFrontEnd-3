<template>
    <!-- 
        
    registrar-usuario-satisfactorio (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/352e3a6e-2f71-4f59-a5ef-da1e7d9e8656/Registrar-usuarios-satisfactorio)  
    MB-registrar-usuario-satisfactorio (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/8f0be167-3415-45d1-9704-d104fdc7d120/MB-Registrar-usuarios-satisfactorio-1)

    -->
    <div class="register mb-20">
        <div class="register-success-container">
            <div class="responsive-register">
                <p class="subtitle bold white-text ml-5">Registro</p>
                <div class="divider ml-5 mt-1"></div>
                <p class="white-text mt-10 ml-5 hidden md:block">Crear una cuenta</p>
                <w-card :shadow="false" class="mt-5 register-card">
                    <p
                        class="text-center tertiary-text bold body subtitle-md"
                    >Registro Satisfactorio!</p>
                    <p class="text-center caption body-md">Sus datos fueron registrados</p>
                    <div class="flex flex-row justify-center my-10">
                        <div class="w-2/3">
                            <img src="/images/register.png" />
                        </div>
                    </div>

                    <p
                        class="caption text-center"
                    >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh</p>
                    <div class="flex flex-row justify-center">
                        <w-btn
                            @click="$router.push('/')"
                            color="tertiary"
                            :dark="true"
                            class="register-btn"
                            :fullwidth="windowWidth <= 768"
                        >VOLVER AL INCIO</w-btn>
                    </div>
                </w-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        code: false,
        form: {},
        windowWidth: window.innerWidth
    }),

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    }
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.register {
    margin-top: -20px;
    .register-success-container {
        background-image: url("/images/banners/3.png");
        background-size: 100% 425px;
        background-repeat: no-repeat;
        background-position: top center;
        padding: 75px 0px;
        .divider {
            height: 0px;
            width: 32px;
            border: thin solid $tertiary;
        }

        .responsive-register {
            width: 90%;
            max-width: 768px;
            margin: auto;
            .register-card {
                .card-text {
                    padding: 40px 95px;
                }
                .register-btn {
                    padding: 12px 56px;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .register {
        .register-success-container {
            padding: 45px 15px;
            .responsive-register {
                .register-card {
                    .card-text {
                        padding: 25px;
                    }
                }
            }
        }
    }
}
</style>
