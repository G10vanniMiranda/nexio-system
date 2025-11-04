"use client"

import type { Lead } from '@/types/dashboard'

export default function LeadsTable({ leads }: { leads: Lead[] }) {
    return (
        <div className="overflow-x-auto bg-[#111] rounded-2xl shadow-md">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-[#C8A048] text-left">
                        <th className="p-3">Nome</th>
                        <th className="p-3">Telefone</th>
                        <th className="p-3">Origem</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, i) => (
                        <tr key={i} className="border-t border-gray-800 hover:bg-[#1B1B1B]">
                            <td className="p-3">{lead.name}</td>
                            <td className="p-3">{lead.phone}</td>
                            <td className="p-3">{lead.source}</td>
                            <td className="p-3">{lead.status}</td>
                            <td className="p-3">{lead.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
