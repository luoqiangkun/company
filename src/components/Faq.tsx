
import { IFaq } from "@/lib/type";

type Props = {
    data: IFaq[]
}

export const Faq = ({ data }: Props) => {
    return (
        <div className="container px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14  lg:pt-24 mx-auto">
            <div className="max-w-2xl mx-auto divide-y divide-gray-200 dark:divide-neutral-700">
                {
                    data.map( (item,index) => {
                        return (
                            <div key={index} className="py-8 first:pt-0 last:pb-0">
                                <div className="flex gap-x-5">
                                    <svg className="shrink-0 mt-1 size-6 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                                    <div className="grow">
                                    <h3 className="md:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                        { item.question }
                                    </h3>
                                    <p className="mt-1 text-gray-500 dark:text-neutral-500">
                                        { item.answer }
                                    </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    );
};

export default Faq;