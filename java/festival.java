import java.io.*;
import java.util.*;

interface Storage {
    void save();
    void retrieve();
}

class FestivalModel implements Storage {
    private String name;
    private String place;
    private String type;
    private String date;

    public FestivalModel(String name, String place, String type, String date) {
        this.name = name;
        this.place = place;
        this.type = type;
        this.date = date;
    }

    public FestivalModel() {}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    // ���� �޼���
    public void save() {
        try (FileWriter fw = new FileWriter("festivals.txt", true)) {
            fw.write(name + "," + place + "," + type + "," + date + "\n");
            System.out.println(name + "��(��) ����Ǿ����ϴ�.");
        } catch (IOException e) {
            System.out.println("���� ���� �� ������ �߻��߽��ϴ�.");
        }
    }

    // ��� ��ü ��ȸ �޼���
    public void retrieve() {
        File file = new File("festivals.txt");
        if (!file.exists() || file.length() == 0) {
            System.out.println("����� ������ �����ϴ�.");
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] festivalDetails = line.split(",");
                System.out.println("�̸�: " + festivalDetails[0]);
                System.out.println("���: " + festivalDetails[1]);
                System.out.println("����: " + festivalDetails[2]);
                System.out.println("��¥: " + festivalDetails[3]);
                System.out.println("-----------------------------");
            }
        } catch (IOException e) {
            System.out.println("���� �б� �� ������ �߻��߽��ϴ�.");
        }
    }

    // ���� �˻� �޼���
    public void searchByKeyword(String keyword) {
        File file = new File("festivals.txt");
        if (!file.exists() || file.length() == 0) {
            System.out.println("����� ������ �����ϴ�.");
            return;
        }

        boolean found = false;
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] festivalDetails = line.split(",");
                String festivalName = festivalDetails[0];

                // ������ Ű���带 �����ϸ� ���
                if (festivalName.contains(keyword)) {
                    System.out.println("ã�� ���: ");
                    System.out.println("�̸�: " + festivalDetails[0]);
                    System.out.println("���: " + festivalDetails[1]);
                    System.out.println("����: " + festivalDetails[2]);
                    System.out.println("��¥: " + festivalDetails[3]);
                    System.out.println("-----------------------------");
                    found = true;
                }
            }
            if (!found) {
                System.out.println("�˻��� Ű���尡 ���Ե� ��縦 ã�� �� �����ϴ�.");
            }
        } catch (IOException e) {
            System.out.println("���� �б� �� ������ �߻��߽��ϴ�.");
        }
    }
}

class CreateCal {
    Scanner scan = new Scanner(System.in);
    boolean breakPoint = true;

    void test() {
        while (breakPoint) {
            System.out.print("��� �� ���� �̸��� �Է��ϼ���. :");
            String name = scan.next();
            System.out.print("��� �� ���� ��Ҹ� �Է��ϼ���. :");
            String place = scan.next();
            System.out.print("��� �� ���� ������ �Է��ϼ���. :");
            String type = scan.next();
            System.out.print("��� �� ���� ��¥�� �Է��ϼ���. :");
            String date = scan.next();

            FestivalModel fm = new FestivalModel(name, place, type, date);
            fm.save();  // ��� ���� ����
            breakPoint = false;
        }
    }
}

class Festival {
    public static void main(String args[]) {
        Scanner scan = new Scanner(System.in);
        boolean breakPoint = true;

        while (breakPoint) {
            System.out.println("* ����� ��� ���� �ý��� *");
            System.out.println("0. �׸��ϱ�");
            System.out.println("1. ���� �� ��� �߰�");
            System.out.println("2. ���� �� ��� ��ȸ");
            System.out.println("3. ���� �˻�");
            System.out.print("���Ͻô� ����� �Է��ϼ���: ");
            int func_num = scan.nextInt();

            switch (func_num) {
                case 0:
                    System.out.println("�ý����� �����մϴ�.");
                    breakPoint = false;
                    break;
                case 1:
                    CreateCal createCal = new CreateCal();
                    createCal.test();
                    break;
                case 2:
                    // ���� �� ��� ��ȸ (���� ��ü ���)
                    FestivalModel fmRetrieve = new FestivalModel();
                    fmRetrieve.retrieve();
                    break;
                case 3:
                    // ���� �˻�
                    System.out.print("�˻��� Ű���带 �Է��ϼ���: ");
                    String keyword = scan.next();
                    FestivalModel fmSearch = new FestivalModel();
                    fmSearch.searchByKeyword(keyword);
                    break;
                default:
                    System.out.println("������ ���� �ȿ��� ����ּ���.\n");
                    break;
            }
        }
    }
}
