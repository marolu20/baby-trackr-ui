export function SummaryCard({ title, children }) {
    return(
       <div className="rounded-xl  min-h-56 bg-white shadow-sm border border-gray-200 p-6">
         <h2 className="text-lg text-gray-700 font-semibold">
             {title}
         </h2>
        <div className="mt-6">
            {children}
        </div>
       </div>
   );
}

export default SummaryCard;
