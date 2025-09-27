import db from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DataTable from "@/components/User/DataTable";
import ExportUserButton from "@/components/User/ExportUserButton";
import { ImportUserButton } from "@/components/User/ImportUserForm";
import { CreateUserForm } from "@/components/User/CreateUserForm";
import { paginate } from "@/lib/paginate";
import SearchForm from "@/components/User/SearchUserForm";
import { buildSearchWhere } from "@/helpers/buildSearchWhere";
import { parseSearchParams } from "@/helpers/parseSearchParams";

interface PageProps {
  params: { role: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { role } = params;

  const roles = await db.role.findUnique({
    where: { role_name: role },
  });

  if (!roles) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive mb-2">
                Role Not Found
              </h1>
              <p className="text-muted-foreground">
                Role "{role}" tidak ditemukan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ gunakan helper biar konsisten dan aman
  const { currentPage, searchQuery } = parseSearchParams(searchParams);

  const whereClause = buildSearchWhere({ role_id: roles.id }, searchQuery, [
    "full_name",
    "email",
  ]);

  const { data: users, pagination } = await paginate({
    model: db.user,
    args: {
      where: whereClause,
      include: { role: true },
      orderBy: { full_name: "asc" },
    },
    page: currentPage,
    perPage: 10,
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            User {role} Management
          </h1>
          <p className="text-muted-foreground">
            Manage {role.toLowerCase()} users and their permissions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchForm initialSearch={searchQuery} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <ExportUserButton query={role} />
                <ImportUserButton />
                <CreateUserForm />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <DataTable
            users={users}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalUsers={pagination.total}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
