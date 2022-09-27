const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

async function main() {
    const project = await prisma.shop_project.findUnique({
        where: { id: 1 },
        select: {
            id: true,
            shop_id: true,
            project_code: true,
            target_feed_id: true,
            target_language_id: true,
            target_feed_url: true,
            created_at: true,
            last_updated_at: true,
            shop_category: {
                where: {
                    OR: [{ category_status_id: 2 }, { category_status_id: 3 }],
                },
                select: {
                    category_library: {
                        select: {
                            natural_category_id: true,
                        },
                    },
                    shop_product: {
                        select: {
                            natural_product_id: true,
                            product_name: true,
                            shop_product_information: {
                                where: {
                                    OR: [
                                        { product_information_status_id: 3 },
                                        { product_information_status_id: 2 },
                                    ],
                                },
                                select: {
                                    item_information: {
                                        select: {
                                            item_information_name: true,
                                        },
                                    },
                                    product_information_value: true,
                                },
                            },
                            shop_brand: {
                                where: {
                                    OR: [{ brand_status_id: 2 }, { brand_status_id: 3 }],
                                },
                                select: {
                                    target_brand_id: true,
                                },
                            },
                        },
                    },
                    shop_param: {
                        where: {
                            OR: [{ parameter_status_id: 2 }, { parameter_status_id: 3 }],
                        },
                        select: {
                            target_param_id: true,
                            shop_value: {
                                where: {
                                    OR: [{ value_status_id: 2 }, { value_status_id: 3 }],
                                },
                                select: {
                                    target_value: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    console.log({ project })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })